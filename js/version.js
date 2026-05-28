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
window.AL_VERSION      = 'v3.38';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '07:00';
window.AL_VERSION_NOTE = 'Admin — bouton « 🔑 Capturer » ajouté à côté des « non stocké » dans la colonne « Mot de passe ». Permet à l\'admin de saisir une fois le mdp actuel d\'un utilisateur existant : le mdp est vérifié auprès de Firebase Auth (signInWithEmailAndPassword via app secondaire), puis stocké en clair dans users/{uid}.password et apparaît dans la colonne. C\'est le seul moyen côté client de populer le champ pour les comptes créés avant la v3.37 (Firebase Auth ne révèle jamais les mdp existants).';
