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
window.AL_VERSION      = 'v3.11';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '22:00';
window.AL_VERSION_NOTE = 'Calculs individuels : pour le câble final vers le tableau abonné (CIBE→TA, ou REMBT→TA en mode sans CIBE), choix Cuivre ou Alu par logement (sélecteur dans la feuille de chutes). Le cuivre utilise ρ=0,0225 (NF C 15-100), l\'alu reste à 0,037. Chutes, section recommandée, schéma, PDF et Excel suivent le matériau choisi. Par défaut tout reste en alu.';
