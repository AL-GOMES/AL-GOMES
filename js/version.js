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
window.AL_VERSION      = 'v3.14';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '22:50';
window.AL_VERSION_NOTE = 'Cohérence des résistivités : Calcul Câble utilise désormais les mêmes valeurs que Calculs Individuels — Cu 0,0225 / Alu 0,037 Ω·mm²/m, à température de service (NF C 15-100 §525, ≈ 1,25 × ρ à 20 °C) au lieu des valeurs à 20 °C. Les chutes de tension affichées sont donc un peu plus élevées (plus prudentes) et identiques entre les deux pages.';
