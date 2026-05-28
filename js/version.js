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
window.AL_VERSION      = 'v3.71';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '23:15';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 5 schéma : câble cascade entre REMBT n et REMBT n+1 rendu beaucoup plus visible. Trait 5 px rouge #c0392b (au lieu de 3 px bleu marine peu visible), pastille de jonction agrandie, flèche d\'arrivée plus marquée, étiquette « Câble cascade » avec bordure rouge et ombre portée. Le min-height de la zone passe de 74 à 94 px pour donner plus d\'air autour du tag.';
