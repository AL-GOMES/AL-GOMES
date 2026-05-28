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
window.AL_VERSION      = 'v3.67';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '22:15';
window.AL_VERSION_NOTE = 'Calculs individuels — bande vide entre le bandeau du haut et les onglets supprimée : la .mode-bar avait été déplacée dans l\'Étape 1 (v3.59) mais son emplacement réservé (50 px à top:48px) restait vide. .tabs descend maintenant de top:98px à top:48px et .content margin-top passe de 160 à 110 px.';
