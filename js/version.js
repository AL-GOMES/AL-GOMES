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
window.AL_VERSION      = 'v3.68';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '22:30';
window.AL_VERSION_NOTE = 'Calculs individuels — la bande vide était encore là parce qu\'un <style id="shell-override"> en tête de fichier forçait .content{margin-top:112px} (calculé pour l\'ancien layout). Mise à jour à 62 px (110 nouveau total - 48 topbar) → le contenu remonte juste sous les onglets sur tous les onglets.';
