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
window.AL_VERSION      = 'v3.36';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '00:38';
window.AL_VERSION_NOTE = 'Obfuscation étendue aux fichiers du dossier js/ (firebase-init, util, auth-guard, cloud-sync) : ils étaient encore lisibles dans l\'onglet Sources de F12, c\'est désormais du charabia comme le reste. Comportement identique (vérifié page par page). La structure HTML/CSS (onglet Elements) reste visible par nature.';
