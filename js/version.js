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
window.AL_VERSION      = 'v3.28';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '13:36';
window.AL_VERSION_NOTE = 'Sécurité : durcissement anti-XSS — échappement systématique (escH) de toutes les données importées/saisies rendues en HTML dans Tableau Abonné et Calculs collectif (noms de bâtiments, repères, circuits, valeurs de champs). Règles Firestore : validation de type/taille sur la collection presence (à redéployer via firebase deploy).';
