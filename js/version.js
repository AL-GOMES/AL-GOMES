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
window.AL_VERSION      = 'v3.19';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '09:37';
window.AL_VERSION_NOTE = 'Dimensionnement REMBT : le RCP 400 (module réseau coupure 400 / protection 200) devient une case « point de coupure / protection réseau » par REMBT. Elle est pré-cochée pour une racine alimentée directement par le réseau ENEDIS, décochée pour un coffret de façade (CCPI) ou une cascade (départ déjà protégé en amont), et ajustable au cas par cas selon le plan de montage ENEDIS de l\'affaire. Codet ENEDIS du RCP 400 ajouté (67.71.109). Le reste (RAC, BR, support, nomenclature) demeure full auto.';
