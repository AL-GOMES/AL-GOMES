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
window.AL_VERSION      = 'v3.53';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '18:45';
window.AL_VERSION_NOTE = 'Calculs individuels — la détection du scope=c1only en v3.52 retournait null (CI inaccessible depuis ma <script>). Fallbacks ajoutés : DOM (.scope-btn.on), puis localStorage. Notif violette bas-droite « C1+C2→C1 : N (scope=…) » qui s\'affiche pendant la génération PDF pour valider que le remplacement tourne effectivement et avec quel scope détecté.';
