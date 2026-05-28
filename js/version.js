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
window.AL_VERSION      = 'v3.42';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '15:30';
window.AL_VERSION_NOTE = 'Calculs individuels — diagnostic enrichi sur l\'erreur d\'import PDF : la popup affiche désormais la taille du fichier, l\'état des marqueurs BEGIN/END, et un dump des 200 derniers caractères du PDF. Permet de savoir d\'un coup d\'œil si le PDF a été généré avec ou sans injection (utile pour distinguer un bug d\'export d\'un bug d\'import).';
