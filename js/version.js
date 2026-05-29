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
window.AL_VERSION      = 'v3.82';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '11:40';
window.AL_VERSION_NOTE = 'Calculs individuels — dimensionnement du support REMBT avec réserve de réalimentation : on garde TOUJOURS ≥ 2 plages libres → rembtSuggest passe au support plus gros (6 → 9 → 12) dès que le support choisi laisserait moins de 2 plages libres (5-6 pl. → 9 ; 8-9 pl. → 12). Au-delà de 10 plages utiles (≥ 11), même un 12 ne garde pas 2 de libre → « à diviser ». Aucun impact sous 5 plages utiles.';
