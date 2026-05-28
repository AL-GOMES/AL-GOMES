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
window.AL_VERSION_TIME = '01:30';
window.AL_VERSION_NOTE = 'Calculs individuels — ΔU (V) / ΔU (%) vraiment partout (correctif de la v3.77). Libellés de chute unifiés sur TOUS les onglets ET dans le PDF, suffixes de tronçon conservés : « ΔU (V) » (volts), « ΔU C2 (%) » / « ΔU C1 (%) » / « ΔU dériv. (%) » (tronçon) et « ΔU C1+C2 (%) » (total). Corrige les cas que la v3.77 laissait passer : en-tête « VU » des Étapes 3/4 (unité « V » dans un <span> séparé → réécrit au niveau de l’élément, en se calant sur le title), et en-têtes PDF « %C2 / %C1 / % dériv. / % C1+C2 / Σ C1+C2 / % chute ». Mapping mutualisé site + PDF (normalizeChuteLabel) ; observateur DOM recentré sur .content (barre d’onglets exclue pour garder les sous-titres de navigation concis).';
