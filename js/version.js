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
window.AL_VERSION      = 'v3.22';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '10:18';
window.AL_VERSION_NOTE = 'Synthèse / schéma : le câble de liaison cascade est désormais CENTRÉ sur l\'axe des blocs REMBT (et l\'indentation supprimée), si bien qu\'il relie réellement le bloc parent au bloc enfant — point de départ sur le REMBT amont, flèche d\'arrivée sur le REMBT aval. Corrige le câble qui apparaissait isolé à gauche.';
