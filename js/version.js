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
window.AL_VERSION      = 'v3.47';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '17:15';
window.AL_VERSION_NOTE = 'Autocontrôle — Étape 1 « Projet » : le champ « P / SG » devient un textarea (3 lignes) au lieu d\'un input texte. L\'utilisateur peut désormais mettre un SG par ligne (Entrée pour aller à la ligne) — le PDF SéQuélec respecte les sauts de ligne via pdf-lib. Auto-migration des valeurs existantes contenant `/` vers des sauts de ligne au chargement.';
