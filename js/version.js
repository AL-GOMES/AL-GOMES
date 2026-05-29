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
window.AL_VERSION      = 'v3.94';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '19:25';
window.AL_VERSION_NOTE = 'Calculs individuels — PDF : la page « Schéma récapitulatif » affiche désormais le schéma unifilaire EXACT de l’Étape 4 (le SVG du site est capturé et embarqué en image), à la place de l’arbre que le moteur redessinait. L’arbre du moteur et le tableau récapitulatif sont effacés. Pour un projet sur une seule page de schéma (cas courant) le rendu est propre ; à signaler si très gros arbre multi-pages.';
