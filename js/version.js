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
window.AL_VERSION      = 'v3.83';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '12:20';
window.AL_VERSION_NOTE = 'Calculs individuels — correction du schéma busbar du REMBT (Étape 2) cassé en lotissement depuis le passage des RAC35 en role « nonpro » (v3.81) : la branche « nonpro » de busbarSvg (jamais exécutée auparavant) dessinait 3 sous-départs cramés par module → 6 flèches illisibles pour 2 RAC35. busbarSvg est réimplémentée à l’identique (géométrie/couleurs/labels) SAUF le rendu RAC35, désormais une box propre avec un seul départ, sans symbole disjoncteur (RAC35 = non protégé), libellée « RAC 35 ». Rendu byte-for-byte identique à l’original pour RCP400 / BR60 / cascade / arrivée.';
