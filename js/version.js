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
window.AL_VERSION      = 'v3.17';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '09:01';
window.AL_VERSION_NOTE = 'Dimensionnement REMBT « full auto » : les modules de chaque REMBT (arrivée RAC selon section, BR par logement, RCP 400 par cascade) sont calculés automatiquement à chaque modification — plus besoin de cliquer sur « Calcul auto ». Le support, la réserve de plages et la nomenclature suivent. Indicateur ⚙️ auto / ✋ manuel par REMBT ; toute saisie manuelle fige le REMBT, avec un bouton « ↺ Calcul auto » pour revenir à l\'automatique.';
