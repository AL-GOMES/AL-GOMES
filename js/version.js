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
window.AL_VERSION      = 'v3.84';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '13:05';
window.AL_VERSION_NOTE = 'Calculs individuels — corrige la VRAIE cause du « schéma cassé » en lotissement (régression v3.81) : le masquage du bloc toggle RCP400 (cleanRembtCardBlocks) utilisait le motif « RCP 400 », qui matchait AUSSI le bloc « Modules » (son éditeur « Ajuster les modules » liste tous les modules, dont RCP 400) → toute la section Modules + schéma du REMBT était masquée en lotissement. On cible désormais le libellé exact du toggle « Point de coupure / protection réseau » → seul ce toggle est masqué, la section Modules + schéma (avec le rendu RAC35 propre de la v3.83) réapparaît.';
