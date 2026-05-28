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
window.AL_VERSION      = 'v3.50';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '17:50';
window.AL_VERSION_NOTE = 'Autocontrôle PDF SéQuélec — la pagination dynamique tient compte de l\'orientation : pour les pages PAYSAGE (les fiches A1..C1), le « X sur Y » du template est au CENTRE-bas et non à droite. On détecte size.width > size.height et on positionne le whiteOut + nouveau numéro au centre pour le paysage, à droite pour le portrait (couverture / référence / sommaire).';
