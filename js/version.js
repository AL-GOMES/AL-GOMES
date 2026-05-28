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
window.AL_VERSION      = 'v3.60';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '20:30';
window.AL_VERSION_NOTE = 'Calculs individuels — ÉTAPE 2 affiche maintenant des VRAIS tableaux de note de calcul (câbles CCPI → REMBT et REMBT → REMBT cascade) en haut, comme les étapes suivantes. Les cartes de configuration des REMBTs restent en dessous pour permettre la modification des longueurs / sections. Tables auto-régénérées via MutationObserver sur sh-dim.';
