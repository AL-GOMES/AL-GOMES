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
window.AL_VERSION      = 'v3.72';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '23:30';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 5 schéma : câble cascade dessiné comme une vraie LIGNE CONTINUE sur le côté gauche de la section REMBT (au lieu d\'un simple trait au milieu de l\'espace entre deux REMBTs). ::before sur les .plan-rembt-section ayant un .plan-wire après → trait vertical rouge 6 px depuis le haut du REMBT jusqu\'à 30 px dans la zone .plan-wire. ::after = bras horizontal du REMBT box vers la ligne verticale (forme en T). Padding-left:40px sur la section pour faire la place.';
