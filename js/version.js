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
window.AL_VERSION      = 'v3.16';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '08:53';
window.AL_VERSION_NOTE = 'Correctif dimensionnement REMBT : le RCP 400 est de nouveau utilisé par le Calcul auto. D\'après le catalogue Cahors, le RCP 400 est un « raccordement câble départ 50-240² + coupure 400 / protection 200 » — c\'est donc le départ réseau PROTÉGÉ vers chaque REMBT enfant en cascade (1 RCP 400 par enfant). L\'arrivée reste un module RAC choisi selon la section du câble amont.';
