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
window.AL_VERSION      = 'v3.40';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '13:30';
window.AL_VERSION_NOTE = 'Calculs individuels — correctif sauvegarde PDF : le patch jsPDF est désormais appliqué « eagerly » (polling dès que la lib est chargée, sans flag conditionnel), pour éviter qu\'un clic rapide sur PDF avant DOMContentLoaded sorte un PDF sans payload. Ajout aussi de meta http-equiv Cache-Control no-cache pour forcer le navigateur à recharger la page. Console : un log « [ALGOMES backup] » confirme que le patch est actif.';
