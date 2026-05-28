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
window.AL_VERSION      = 'v3.78';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '01:00';
window.AL_VERSION_NOTE = 'Calculs individuels — filet de sécurité ajouté pour la normalisation ΔU : setInterval(1s) qui re-applique normalizeChuteHeaders() sur tout le DOM, au cas où le MutationObserver rate certains rendus (re-renders rapides de l\'obfusqué, sheets cachés rendus avant l\'attache de l\'observer, etc.).';
