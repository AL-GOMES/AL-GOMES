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
window.AL_VERSION      = 'v3.8';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '21:01';
window.AL_VERSION_NOTE = 'Calculs individuels — la Synthèse (onglet 4) reflète désormais entièrement le mode « sans CIBE » : légende du schéma, message d\'aide, tableau des règles du PDF et tableau récapitulatif du PDF décrivent la dérivation directe REMBT → tableau abonné (un seul câble, comparé à la limite totale) au lieu du trajet C2 → CIBE → C1.';
