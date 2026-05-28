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
window.AL_VERSION      = 'v3.64';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '21:30';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 2 tableaux : (1) tout le contenu centré (text-align:center sur th et td). (2) La chute de tension cascade s\'affiche désormais même quand le courant d\'emploi est nul (Itri=0) — avant linkChute() retournait null si aucun logement aval n\'avait de kVA, ce qui masquait toute la ligne. On reimplémente le calcul localement pour afficher 0 plutôt que « — » dans ce cas.';
