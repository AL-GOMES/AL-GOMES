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
window.AL_VERSION      = 'v3.49';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '17:45';
window.AL_VERSION_NOTE = 'Autocontrôle PDF SéQuélec — correctif coords du whiteOut « X sur 10 » : descendu à y=12, agrandi à 130×26 (était y=50, 95×18) pour couvrir effectivement la position réelle du texte du template. Ajout d\'une notif visible « PDF : X/Y pages renumérotées » en bas-droite après chaque génération PDF, pour vérifier que le code itère bien sur toutes les pages des projets multi-bâtiments.';
