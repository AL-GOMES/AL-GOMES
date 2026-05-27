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
window.AL_VERSION      = 'v3.29';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '14:10';
window.AL_VERSION_NOTE = 'Sécurité (suite) : Planning — les noms de chantier affichés dans la vue timeline et les listes déroulantes sont désormais échappés (ils étaient rendus bruts alors qu\'ils proviennent d\'un planning partagé entre tous les utilisateurs). Vérifié : Attestations (carnet/modèles) et tokens admin déjà sécurisés (échappement + sessionStorage), aucun changement nécessaire.';
