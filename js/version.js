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
window.AL_VERSION      = 'v3.31';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '15:48';
window.AL_VERSION_NOTE = 'Contrôle des horaires d\'accès : l\'heure de référence est désormais l\'heure SERVEUR (Firestore/Google), plus l\'horloge du PC. Modifier l\'heure de son ordinateur ne permet donc plus de contourner le créneau d\'accès. Repli automatique sur l\'horloge locale si le réseau est indisponible.';
