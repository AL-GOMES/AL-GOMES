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
window.AL_VERSION      = 'v3.73';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '23:50';
window.AL_VERSION_NOTE = 'Calculs individuels — revert de la v3.72 (ligne câble continue) qui produisait des segments rouges détachés sur le côté gauche du schéma (CSS :has flottant hors contexte). Retour à la v3.71 (trait rouge épais centré entre REMBTs). Une vraie ligne continue allant du REMBT 1 jusqu\'au REMBT 2 nécessitera de modifier le HTML/SVG généré par le code obfusqué, pas seulement du CSS.';
