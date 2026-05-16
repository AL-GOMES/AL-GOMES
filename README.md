# A.L. GOMES — Bureau d'études électriques

Application web interne du bureau d'études A.L. GOMES.
Architecture **multi-pages HTML autonomes** hébergée sur GitHub Pages,
avec authentification et données via Firebase (Auth + Firestore).

## 🗂️ Structure des fichiers

### Racine

| Fichier | Rôle |
|---|---|
| `index.html` | Page de login (Firebase Auth) |
| `accueil.html` | Shell principal après connexion (top bar + iframe contenu) |
| `home.html` | Page d'accueil chargée dans l'iframe d'`accueil.html` |
| `admin.html` | Console admin : utilisateurs, rôles, droits par page, IP, signatures |

### Modules métier

| Fichier | Module |
|---|---|
| `AUTOCONTROLE.html` | Auto-contrôle Colonne (NF C 14-100) et Branchement C4 (GP 04) |
| `ATTESTATIONS.html` | Génération d'attestations (PDF + PNG signature/cachet) |
| `HISTORIQUE-ATTESTATIONS.html` | Historique des attestations émises |
| `CALCUL_SECTION_CABLE.html` | Calcul de section de câble (NF C 15-100, habitat) |
| `Derivations-TGBT.html` | Dérivations TGBT |
| `TABLEAU-ABONNE.html` | Tableau abonné |
| `PLANNING.html` | Planning de chantier |
| `LISEUSE-PDF.html` | Liseuse PDF (annotations, comptage, mesure) |
| `liseuse-normes.html` | Référentiel des normes (NF C 15-100, 14-100, GP 04, IRVE, PMR…) |
| `COMPTAGE-SYMBOLES.html` | Prototype de comptage automatique de symboles électriques |

### Code partagé

| Fichier | Rôle |
|---|---|
| `js/firebase-init.js` | Configuration et initialisation Firebase (chargé en premier) |
| `js/auth-guard.js` | Garde d'authentification + contrôle d'accès par page |
| `js/util.js` | Utilitaires partagés (`esc`, `escAttr`, `fmtDate`…) |

### Assets

- `SIGNATURE_*.png` : signatures d'employés (legacy, désormais stockées dans Firestore via le module Signature)
- `assets/` : ressources statiques

## 🔥 Modèle Firestore

### Collections

| Collection | Description |
|---|---|
| `users/{uid}` | `{ login, name, role, banned, schedule, createdAt, createdBy }` |
| `presence/{uid}` | `{ online, lastSeen, ip, city, country, lat, lon, deviceName, os, browser, hostname, role }` |
| `sessions` | Journal des connexions : `{ uid, login, name, ip, city, country, lat, lon, userAgent, os, browser, hostname, deviceName, timestamp }` |
| `bannedIps/{ip}` | `{ ip, reason, bannedAt, bannedBy }` |
| `signatures` | `{ ownerUid, ownerName, ownerRole, label, png, createdAt, createdBy }` |
| `attestationsHistory` | `{ affaire, objet, corps, nom, fonction, …, generatedAs, createdAt, createdBy, createdByName }` |
| `customTemplates` | Modèles PDF personnalisés |
| `config/pageAccess` | Map `{pageFichier: [roleId, …]}` qui autorise chaque rôle à chaque page |
| `config/roles` | `{ roles: [{ id, label, color }, …] }` |
| `schedules/{uid}` | Horaires d'accès des utilisateurs (jours + tranches) |

### Règles Firestore

> ⚠️ **Important** : le contrôle d'accès côté client (auth-guard) est insuffisant — il **doit** être doublé par des règles Firestore strictes.
>
> La source de vérité est le fichier **[`firestore.rules`](firestore.rules)** à la racine du repo, déployable via :
> ```bash
> firebase login
> firebase use algomes-a4e46
> firebase deploy --only firestore:rules
> ```
>
> Le bloc ci-dessous est un instantané du contenu de ce fichier — toute modification doit se faire dans `firestore.rules` puis être redéployée.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn()  { return request.auth != null; }
    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    function notBanned() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.banned != true;
    }

    // users : lecture par les connectés non bannis ; écriture admin uniquement
    match /users/{uid} {
      allow read: if notBanned();
      allow write: if isAdmin();
    }
    // presence : chacun écrit son propre doc, lecture admin
    match /presence/{uid} {
      allow read: if isAdmin();
      allow write: if isSignedIn() && request.auth.uid == uid;
    }
    // sessions : append-only par l'utilisateur, lecture admin
    match /sessions/{id} {
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
      allow read: if isAdmin();
      allow delete: if isAdmin();
    }
    // signatures : lecture par tous les connectés, write par owner ou admin
    match /signatures/{id} {
      allow read: if notBanned();
      allow create: if isSignedIn() && request.resource.data.ownerUid == request.auth.uid;
      allow update, delete: if isAdmin() ||
        (isSignedIn() && resource.data.ownerUid == request.auth.uid);
    }
    // attestationsHistory : auteur + admin
    match /attestationsHistory/{id} {
      allow read: if notBanned();
      allow create: if isSignedIn() && request.resource.data.createdBy == request.auth.uid;
      allow delete: if isAdmin() ||
        (isSignedIn() && resource.data.createdBy == request.auth.uid);
    }
    // config/* : lecture par tous, écriture admin
    match /config/{doc} {
      allow read: if notBanned();
      allow write: if isAdmin();
    }
    match /bannedIps/{id} {
      allow read: if notBanned();
      allow write: if isAdmin();
    }
    match /customTemplates/{id} {
      allow read: if notBanned();
      allow write: if isAdmin();
    }
    match /schedules/{uid} {
      allow read: if isAdmin() ||
        (isSignedIn() && request.auth.uid == uid);
      allow write: if isAdmin();
    }
  }
}
```

## 🔐 Authentification & accès

1. `index.html` : login Firebase email/password
2. Chaque page protégée charge `js/firebase-init.js` puis `js/auth-guard.js` qui :
   - vérifie `auth.currentUser`
   - lit le doc `users/{uid}` pour le rôle et le statut bloqué/non
   - lit `config/pageAccess` pour vérifier que ce rôle a accès à la page actuelle
   - bloque l'affichage et redirige sinon
3. Les rôles admin sont protégés par un garde-fou (admin a toujours accès à `admin.html`)

## 🚀 Déploiement

Pages servies directement par **GitHub Pages** depuis la branche `main`.
Aucune étape de build : push = déployé.

## 🧪 Développement local

```bash
# Cloner
git clone https://github.com/jerome93190/AL-GOMES.git
cd AL-GOMES

# Servir localement (n'importe quel serveur statique, ex. Python)
python3 -m http.server 8080
# ouvrir http://localhost:8080
```

## 📦 Dépendances externes (CDN)

| Lib | Version | Usage |
|---|---|---|
| Firebase | 10.12.0 | Auth + Firestore |
| PDF.js | 3.11.174 | Rendu / lecture PDF |
| PDF-lib | 1.17.x | Génération / édition PDF |
| Leaflet | 1.9.4 | Carte des connexions admin |

## 🛠️ Conventions

- Les commits suivent un format descriptif en français avec contexte (ex. `Autocontrôle : suppression du panneau X`)
- Les modifications passent par des PR sur la branche `claude/<topic>-<id>` puis merge dans `main`
- Pas de framework JS : vanilla JS + Firebase compat SDK
