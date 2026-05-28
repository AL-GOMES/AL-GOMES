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
window.AL_VERSION      = 'v3.48';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '17:30';
window.AL_VERSION_NOTE = 'Autocontrôle PDF SéQuélec — (1) line-height plus serré (×0.95) quand un drawText contient des sauts de ligne, donc les multiples SGX sont visuellement plus rapprochés sur la fiche. (2) Re-numérotation dynamique des pages : juste avant la sauvegarde du PDF, on blanchit la zone bas-droite où le template imprime « X sur 10 » et on réécrit « <i+1> sur <total> » avec le vrai nombre de pages.';
