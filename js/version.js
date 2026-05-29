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
window.AL_VERSION      = 'v3.95';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '23:41';
window.AL_VERSION_NOTE = 'Normes — nouvelle page « Modules & REMBT » (NF C 14-100) qui documente tout le travail des Calculs individuels : terminologie (CCPI / REMBT / CIBE / T.A), types de projet (petit collectif RCP 400 vs lotissement RAC), modules Cahors G3 avec réfs ENEDIS et conditions (RAC 240/150/35, BR 60M/T), choix de la tête de réseau et cascade REMBT, départs vers T.A (RAC 35 avec CIBE = 3 mono ou 1 tri / BR 60 sans CIBE), chutes de tension (formules, ρ, limites 1 % / 2 %) et dimensionnement du support avec réserve. Correction du tableau de foisonnement (paliers recalés sur la table officielle NF C 14-100, désormais identiques au moteur : 2-4 → 1,00 ; 5-9 → 0,78 …).';
