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
window.AL_VERSION      = 'v3.24';
window.AL_VERSION_DATE = '2026-05-27';
window.AL_VERSION_TIME = '10:55';
window.AL_VERSION_NOTE = 'Export PDF : nouvelle page « FEUILLE DE CALCUL RÉSEAUX » (optionnelle, cochée par défaut) qui liste les câbles réseau BT — CCPI → REMBT et liaisons cascade REMBT → REMBT — avec longueur, section, nombre de logements desservis, puissance foisonnée, coefficient k, courant d\'emploi, calibre normalisé et chute de tension (colorée selon la limite). Case « Feuille réseaux » ajoutée dans l\'onglet Synthèse.';
