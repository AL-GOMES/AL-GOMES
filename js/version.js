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
window.AL_VERSION      = 'v3.57';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '19:45';
window.AL_VERSION_NOTE = 'Calculs individuels — alignement du PDF sur la logique du site (`showTotal = !c1only && !noCibe`). La colonne C1+C2 et les libellés associés sont retirés dans les modes CIBE → TA seul ET REMBT → TA sans CIBE (et pas seulement c1only). Suppression des badges de debug C1+C2 qui polluaient l\'écran.';
