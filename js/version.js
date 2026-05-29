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
window.AL_VERSION      = 'v3.92';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '17:55';
window.AL_VERSION_NOTE = 'Correctif version.js : la note v3.90/v3.91 laissait un résidu de l’ancienne note après le point-virgule (erreur de syntaxe) → version.js ne se chargeait plus et le bandeau affichait « --- ». Note réécrite proprement. Rappel des MAJ PDF récentes : page de garde A4 paysage (logo, titre, affaire/date/type, récap, émetteur A.L. GOMES, mentions légales) et schéma busbar sur la même page que la table de modules de chaque REMBT.';
