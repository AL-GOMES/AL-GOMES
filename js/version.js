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
window.AL_VERSION      = 'v3.80';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '03:10';
window.AL_VERSION_NOTE = 'Calculs individuels — règles métier de sélection des modules Cahors G3 (surcharge des fonctions globales du moteur) + nouveau choix « Petit collectif / Lotissement » dans l’Étape 1. (1) RCP400 réservé au petit collectif ; en lotissement (maisons individuelles) → RAC 240 / RAC 150 selon section. (2) Départ par T.A AVEC CIBE → RAC35 (3 T.A mono OU 1 T.A tri par module). (3) Départ par T.A SANS CIBE → BR60M (mono) / BR60T (tri) par T.A. (4) Départ vers REMBT enfant (cascade) → RAC 150/240 selon section (inchangé). Le type de projet est persisté (restauré au load car migrate() le strippe). Défaut « petit collectif » = comportement antérieur (rétro-compatible).';
