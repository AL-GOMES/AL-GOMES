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
window.AL_VERSION      = 'v3.18';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '09:10';
window.AL_VERSION_NOTE = 'Dimensionnement REMBT : le RCP 400 (coupure 400 / protection 200) est désormais placé EN TÊTE — sur chaque REMBT racine alimenté directement par le réseau ENEDIS ou par un coffret de façade (CCPI) — et non plus par cascade. Les départs vers les REMBT enfants en cascade sont des modules réseau RAC (selon section). Le tout reste full auto.';
