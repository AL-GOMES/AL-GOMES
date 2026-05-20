// =====================================================================
// Version courante du shell AL GOMES (affichée dans le bandeau du haut).
// À mettre à jour à chaque PR mergée sur main :
//   - AL_VERSION       : v1.0 → v1.1 → v1.2 …
//   - AL_VERSION_DATE  : YYYY-MM-DD (jour de la MAJ)
//   - AL_VERSION_TIME  : HH:MM      (heure de la MAJ — local Paris)
//   - AL_VERSION_NOTE  : 1 phrase courte qui décrit le motif de la MAJ
// =====================================================================
window.AL_VERSION      = 'v1.43';
window.AL_VERSION_DATE = '2026-05-20';
window.AL_VERSION_TIME = '23:10';
window.AL_VERSION_NOTE = 'Fix sommaire PDF : remplace "→" par "»" et ajoute un sanitizer WinAnsi sur les champs utilisateur (flèches, emoji, symboles) pour ne plus planter "WinAnsi cannot encode".';
