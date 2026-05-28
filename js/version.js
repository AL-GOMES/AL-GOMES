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
window.AL_VERSION      = 'v3.41';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '15:00';
window.AL_VERSION_NOTE = 'Calculs individuels — indicateurs visibles ajoutés (plus besoin d\'ouvrir la console F12) : badge vert « v3.41 ✓ sauvegarde PDF » dans le bandeau du haut quand le patch est actif, et notif verte « ✓ PDF avec sauvegarde intégrée (N logements, K Ko) » à chaque export PDF. Message d\'erreur de l\'import enrichi pour rappeler qu\'il faut d\'abord générer un PDF NEUF (les anciens PDF n\'ont pas de sauvegarde).';
