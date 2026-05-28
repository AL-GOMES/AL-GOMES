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
window.AL_VERSION      = 'v3.66';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '22:00';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 2 cartes REMBT : retrait des blocs « Coffret de façade (CCPI) » et « Liaison cascade » dans toutes les cartes REMBT (root + enfants). Ces blocs sont redondants avec les configurations désormais accessibles dans l\'Étape 1 (longueurs CCPI et cascade par REMBT) et dans les tableaux en haut de l\'Étape 2 (section éditable, type HN33S33, chute). Retrait aussi du bouton « Modifier la config » dans le bandeau d\'onglets.';
