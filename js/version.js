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
window.AL_VERSION      = 'v3.7';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '18:49';
window.AL_VERSION_NOTE = 'Redéploiement après la panne GitHub de la mi-journée (le build GitHub Pages des v3.4–v3.6 avait calé, le site restait coincé sur une ancienne version). Nouveauté : détection automatique des MAJ — un bandeau « Recharger » apparaît dès qu\'une nouvelle version est en ligne, fini les blocages sur une ancienne version en cache.';
