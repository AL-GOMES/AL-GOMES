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
window.AL_VERSION      = 'v3.85';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '13:35';
window.AL_VERSION_NOTE = 'Calculs individuels — corrige le double « Étape 1 » dans le bandeau d’onglets. Le moteur renumérote ses onglets (dim/rc/ct/sch) à partir de 1 selon le scope, sans connaître l’onglet « Choix du scénario » (Étape 1, statique, lui aussi « 1 ») → deux onglets « 1 ». On renumérote désormais tous les onglets VISIBLES dans l’ordre du DOM (scénario=1, puis 2, 3, …), via un MutationObserver sur le bandeau (.tabs) qui suit les changements de numéro et de visibilité.';
