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
window.AL_VERSION      = 'v3.45';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '16:45';
window.AL_VERSION_NOTE = 'Autocontrôle — le texte « N niveaux » sur chaque ligne d\'escalier est désormais cliquable (souligné en pointillés) et ouvre un prompt pour modifier directement le nombre de niveaux. Avant, il fallait passer par « Renommer » qui demandait le nom puis les niveaux dans 2 prompts successifs, ce qui n\'était pas évident. Le défaut de 5 niveaux à la création d\'un bâtiment est conservé mais maintenant modifiable.';
