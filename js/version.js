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
window.AL_VERSION      = 'v3.55';
window.AL_VERSION_DATE = '2026-05-28';
window.AL_VERSION_TIME = '19:15';
window.AL_VERSION_NOTE = 'Calculs individuels — même bug que pour save() en v3.43 : le patch C1+C2 sur le PROTOTYPE.text n\'était pas appelé parce que le code obfusqué fait `doc.text = function(...)` sur l\'instance. Solution identique : on wrap text et autoTable AU NIVEAU INSTANCE dans le constructeur Wrapped, comme save/output. Badge persistant « C1+C2 : vus=N remplacés=M scope=… » bas-droite (cliquer pour masquer) — montre exactement combien de chaînes contenant C1+C2 ont été interceptées et quel scope a été détecté.';
