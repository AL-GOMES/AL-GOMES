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
window.AL_VERSION      = 'v3.81';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '11:00';
window.AL_VERSION_NOTE = 'Calculs individuels — corrige 2 points du choix « Lotissement » (v3.80) : (1) plus aucun RCP400 possible en lotissement — rcpOn force false (même si forçage manuel rembt.rcp) et le bloc RCP400 de la carte REMBT est masqué ; (2) le schéma busbar du REMBT étiquetait les RAC35 « BR 60M » car busbarSvg se base sur item.role : les modules RAC35 utilisent désormais role « nonpro » (→ « RAC 35 » dans le schéma) tout en restant agrégés comme RAC35 dans la nomenclature. Petit collectif inchangé (RCP400 auto/manuel conservé).';
