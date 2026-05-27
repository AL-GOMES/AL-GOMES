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
window.AL_VERSION      = 'v3.23';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '10:38';
window.AL_VERSION_NOTE = 'Installation (étape 1) : chaque carte REMBT affiche désormais un SCHÉMA DE CÂBLAGE du coffret (jeu de barres + symboles des modules, style catalogue Cahors), généré automatiquement depuis la configuration : arrivée réseau ↑, branchements protégés (fusible), départs réseau ↓, départs non protégés (RAC 35, hachuré), RCP 400, et plages libres. En interne, la liste ordonnée des modules (rembtLayout) devient la source unique du dimensionnement et du schéma.';
