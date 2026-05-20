// =====================================================================
// Version courante du shell AL GOMES (affichée dans le bandeau du haut).
// À mettre à jour à chaque PR mergée sur main :
//   - AL_VERSION       : v1.0 → v1.1 → v1.2 …
//   - AL_VERSION_DATE  : YYYY-MM-DD (jour de la MAJ)
//   - AL_VERSION_TIME  : HH:MM      (heure de la MAJ — local Paris)
//   - AL_VERSION_NOTE  : 1 phrase courte qui décrit le motif de la MAJ
// =====================================================================
window.AL_VERSION      = 'v1.36';
window.AL_VERSION_DATE = '2026-05-20';
window.AL_VERSION_TIME = '20:25';
window.AL_VERSION_NOTE = 'Dossier matériel : fix export PDF qui plantait avec "format inattendu (data:,)" quand on cliquait Enregistrer depuis la page de garde (ficheForm restait caché → html2canvas vide).';
