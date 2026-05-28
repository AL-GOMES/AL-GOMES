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
window.AL_VERSION      = 'v3.65';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '21:45';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 2 tableaux : ajout d\'une colonne « Câble » qui affiche « HN33S33 » (câbles réseau BT par convention NF C 14-100, idem CCPI→REMBT et cascade). Les colonnes Long. (m) et Section (mm²) sont désormais ÉDITABLES inline : input numérique pour la longueur, select pour la section (16/25/35/50/70/95/120/150/185/240 mm²). Modification → save() + R() → tableaux et schéma se mettent à jour automatiquement. Préservation du focus pendant les re-renders.';
