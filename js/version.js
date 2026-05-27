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
window.AL_VERSION      = 'v3.25';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '11:49';
window.AL_VERSION_NOTE = 'Calculs Individuels → onglet Synthèse : nouveau bouton « 💾 Enregistrer dérivations → Tableau Abonné » qui exporte les logements au format .ALG (algomes-tgbt-share), directement réimportable dans le module Tableau Abonné via « 📤 Importer Dérivations ». Regroupement par bâtiment ; mapping niveau / repère (N° Archi) / surface (m²) — la puissance et le calibre sont dérivés de la surface côté Tableau Abonné.';
