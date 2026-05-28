// =====================================================================
// Version courante du shell AL GOMES (affichée dans le bandeau du haut).
// À mettre à jour à chaque PR mergée sur main :
//   - AL_VERSION       : v1.0 → v1.1 → v1.2 …
//   - AL_VERSION_DATE  : YYYY-MM-DD (jour de la MAJ)
//   - AL_VERSION_TIME  : HH:MM      (heure de la MAJ — local Paris)
//   - AL_VERSION_NOTE  : 1 phrase courte qui décrit le motif de la MAJ
//   IMPORTANT : à chaque bump, mettre aussi à jour le cache-buster
//   `js/version.js?b=NN` dans accueil.html (sinon le navigateur peut
//   servir une ancienne version.js en cache et le bandeau reste figé).
// =====================================================================
window.AL_VERSION      = 'v3.37';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '06:30';
window.AL_VERSION_NOTE = 'Admin — colonne « Mot de passe » dans le tableau utilisateurs (afficher/copier) : les mdp créés/modifiés via l\'admin sont désormais stockés en clair dans users/{uid}.password (les mdp existants restent inaccessibles, Firebase Auth ne les expose pas). Nouveau bouton « ⏏ Déco » qui force la déconnexion d\'un utilisateur sur toutes ses sessions ouvertes via le champ users/{uid}.forceLogoutAt, écouté par le nouveau js/force-logout-check.js.';
