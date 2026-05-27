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
window.AL_VERSION      = 'v3.15';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '08:33';
window.AL_VERSION_NOTE = 'Dimensionnement REMBT revu d\'après le catalogue Cahors / Enedis-Spec-REMBT : (1) réserve « 2 plages libres pour la réalimentation » signalée dans chaque REMBT ; (2) nomenclature à commander par REMBT (enveloppe REMMO + support + modules avec réfs Cahors), à l\'écran et dans le PDF ; (3) choix auto des modules affiné — arrivée RAC selon la section du câble amont et départ réseau RAC par cascade (au lieu d\'un RCP 400 systématique).';
