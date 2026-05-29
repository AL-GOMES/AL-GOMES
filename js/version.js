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
window.AL_VERSION      = 'v3.88';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '15:20';
window.AL_VERSION_NOTE = 'Calculs individuels — PDF : ajout du schéma busbar (jeu de barres) de chaque REMBT sous sa table de modules, sur la page « dim ». Le busbar est pré-rendu (SVG→PNG) avant exportPDF puis inséré ; lastAutoTable.finalY est mis à jour pour que le moteur poursuive sous le schéma (pas de chevauchement). Légende avec le type de projet (Petit collectif / Lotissement). Le PDF reflétait déjà les modules (table lue depuis dim) et les libellés (ΔU, Mono/Tri, Surf., Bat). Tout est défensif : en cas d’échec, le PDF est généré sans le schéma, jamais cassé.';
