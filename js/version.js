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
window.AL_VERSION      = 'v3.89';
window.AL_VERSION_DATE = '2026-05-29';
window.AL_VERSION_TIME = '16:10';
window.AL_VERSION_NOTE = 'Calculs individuels — PDF : page de garde « PRO ». 1ʳᵉ page dédiée (bandeau bleu marine + logo ALGOMES, titre « NOTE DE CALCUL », sous-titre selon scénario, « Conforme NF C 14-100 », encart Affaire/Date/Type de projet, encart récap REMBTs/logements/limites, bloc émetteur A.L. GOMES + adresse + tél + email récupérés des Attestations, mentions légales Siret/TVA/APE en bas). Ajoutée au save puis déplacée en 1ʳᵉ position (page de garde non numérotée, le contenu garde « Page X »). Pied de page enrichi du Siret. 100 % défensif : tout échec ⇒ PDF généré sans la page de garde, jamais cassé. Rendu à valider en navigateur.';
