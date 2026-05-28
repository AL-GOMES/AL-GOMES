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
window.AL_VERSION      = 'v3.77';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '00:45';
window.AL_VERSION_NOTE = 'Calculs individuels — uniformisation des libellés de chute partout : « VU (V) » / « Chute (V) » → ΔU (V), et « % ΔU C1 / C2 / dériv. / C1+C2 / % ΔU » → ΔU (%). Appliqué (a) dans mes propres tableaux Étape 2 (édition directe), (b) dans les tableaux Étape 3 / 4 / Synthèse rendus par le code obfusqué (MutationObserver sur document.body qui remplace dans les textNodes et attributs title/aria-label), (c) dans le PDF (monkey-patch jspdf-autotable head/body/didParseCell + jsPDF.text).';
