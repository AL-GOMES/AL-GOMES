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
window.AL_VERSION      = 'v3.58';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '20:00';
window.AL_VERSION_NOTE = 'Calculs individuels — audit complet PDF vs site (renderFiches obfusqué). 3 différences corrigées : (1) colonne REMBT masquée en c1only (showREMBT = !c1only sur le site), (2) colonne C1+C2 masquée en c1only/noCibe (showTotal, déjà v3.57), (3) header « %ΔU C2 » devient « %ΔU dériv. » en noCibe (côté rc). On NE TOUCHE PLUS aux sous-titres « limite C1+C2 » : le site garde « Limite totale C1+C2 » comme label dans tous les modes, donc PDF aussi.';
