// =====================================================================
// Version courante du shell AL GOMES (affichée dans le bandeau du haut).
// À mettre à jour à chaque PR mergée sur main :
//   - AL_VERSION       : v1.0 → v1.1 → v1.2 …
//   - AL_VERSION_DATE  : YYYY-MM-DD (jour de la MAJ)
//   - AL_VERSION_TIME  : HH:MM      (heure de la MAJ — local Paris)
//   - AL_VERSION_NOTE  : 1 phrase courte qui décrit le motif de la MAJ
// =====================================================================
window.AL_VERSION      = 'v1.44';
window.AL_VERSION_DATE = '2026-05-20';
window.AL_VERSION_TIME = '23:25';
window.AL_VERSION_NOTE = 'Fix export PDF "format inattendu (data:,)" : garde défensive avant chaque capture de fiche (force ficheForm visible + fallback dimensions A4 si scrollWidth/Height = 0).';
