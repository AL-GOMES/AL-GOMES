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
window.AL_VERSION      = 'v3.12';
window.AL_VERSION_DATE = '2026-05-26';
window.AL_VERSION_TIME = '22:07';
window.AL_VERSION_NOTE = 'Calculs individuels : le choix du câble final s\'affiche désormais avec les références NF C 32-321 — AR2V (aluminium) et R2V (cuivre) — au lieu de « Alu » / « Cuivre », partout (sélecteur, en-têtes, schéma, PDF et Excel). Le calcul est inchangé : AR2V → ρ=0,037, R2V → ρ=0,0225.';
