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
window.AL_VERSION      = 'v3.34';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '21:50';
window.AL_VERSION_NOTE = 'Sécurité : une seule connexion simultanée par compte. Si le compte est déjà utilisé sur un autre appareil, la nouvelle connexion est refusée (« Compte déjà connecté »). Plusieurs onglets sur le même navigateur restent autorisés. Après fermeture de l\'autre session, la reconnexion est possible (immédiate si déconnexion propre, sinon sous 1 à 2 min).';
