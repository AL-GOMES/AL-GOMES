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
window.AL_VERSION      = 'v3.52';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '18:30';
window.AL_VERSION_NOTE = 'Calculs individuels — correctif PDF mode « CIBE → TA seul » : les libellés « C1+C2 » qui apparaissent dans le titre, l\'en-tête de colonne et le tableau récap sont remplacés par « C1 » via un monkey-patch de jsPDF.text et jspdf-autotable. En mode c1only il n\'y a pas de tronçon C2, donc « C1+C2 » était trompeur.';
