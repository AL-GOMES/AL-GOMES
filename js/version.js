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
window.AL_VERSION      = 'v3.56';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '19:30';
window.AL_VERSION_NOTE = 'Calculs individuels — en mode CIBE → TA seul, la colonne « % C1+C2 » du PDF n\'est plus juste renommée mais SUPPRIMÉE entièrement (header + cellules + columnStyles). En c1only il n\'y a pas de C2 à additionner, cette colonne fait double emploi avec « %ΔU C1 ». Détection : recherche d\'une chaîne /C1\\s*\\+\\s*C2/ dans le head, suppression des indices correspondants dans head + body + ajustement des columnStyles indexés.';
