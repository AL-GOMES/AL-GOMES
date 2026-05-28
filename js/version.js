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
window.AL_VERSION      = 'v3.54';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '19:00';
window.AL_VERSION_NOTE = 'Calculs individuels — fix bête : le BUILD_TAG du badge bas-droite était hardcodé à v3.44, donc impossible de savoir si le navigateur servait la dernière version ou une version cachée. Le badge lit désormais window.AL_VERSION (avec fallback window.parent.AL_VERSION pour le contexte iframe). Si après Ctrl+F5 le badge n\'affiche pas v3.54, le navigateur sert encore une version cachée et il faut vider le cache du domaine ou cliquer droit dans l\'iframe → Recharger le cadre.';
