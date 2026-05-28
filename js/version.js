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
window.AL_VERSION      = 'v3.59';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '20:15';
window.AL_VERSION_NOTE = 'Calculs individuels — restructuration des onglets : ÉTAPE 1 = « Choix du scénario » (mode de calcul, déplacé depuis l\'ancien bandeau au-dessus des onglets), ÉTAPE 2 = « Note de calcul câbles CCPI ↔ REMBT + REMBT ↔ REMBT » (ex-Installation), ÉTAPE 3 = Chutes REMBT → CIBE, ÉTAPE 4 = Chutes CIBE → TA, ÉTAPE 5 = Synthèse. Le nouvel onglet 1 a son propre handler JS pour activer/désactiver son sheet.';
