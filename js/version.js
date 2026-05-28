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
window.AL_VERSION      = 'v3.39';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '07:30';
window.AL_VERSION_NOTE = 'Calculs individuels — le PDF devient le format de sauvegarde : les données JSON du projet sont embarquées en fin de fichier après %%EOF (ignoré par les visualiseurs PDF) et le bouton « 📥 Import » accepte désormais les PDF pour restaurer un projet. L\'ancien bouton « 📥 Excel » devient « 🔗 Partage TA » (export .ALG vers le module Tableau Abonné). Les deux boutons d\'export à l\'intérieur de la vue Synthèse (PDF complet + Enregistrer dérivations) sont retirés — les exports restent accessibles via le bandeau du haut.';
