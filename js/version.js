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
window.AL_VERSION      = 'v3.13';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '22:44';
window.AL_VERSION_NOTE = 'Calcul Câble : la résistivité ρ du conducteur est désormais affichée dans chaque carte résultat — cuivre 0,0175 et aluminium 0,028 Ω·mm²/m (NF C 15-100 §525, à 20 °C), la valeur utilisée pour le calcul de la chute de tension.';
