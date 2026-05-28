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
window.AL_VERSION      = 'v3.62';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '21:00';
window.AL_VERSION_NOTE = 'Calculs individuels — Étape 1 enrichie : ajout de 4 champs (1) Nombre de logements qui ajuste CI.lgts via addLgt/delLgt + affiche le nombre de REMBT résultant, (2) Toggle CCPI Oui / Non sur le REMBT racine, (3) Longueur câble CCPI → REMBT racine (visible si CCPI = Oui), (4) Longueur câble cascade REMBT → REMBT (visible si ≥ 1 REMBT enfant, s\'applique à toutes les liaisons cascade). Sync auto bidirectionnelle CI ↔ inputs (intervalle 800 ms + listeners).';
