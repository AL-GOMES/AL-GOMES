// =====================================================================
// Déconnexion forcée par l'admin.
//
// Chaque page connectée écoute son propre doc `users/{uid}` :
// si le champ `forceLogoutAt` est plus récent que la date de la dernière
// connexion Firebase (`auth.currentUser.metadata.lastSignInTime`), on
// force un signOut() et un retour à `index.html`.
//
// L'admin déclenche la déconnexion en mettant à jour `forceLogoutAt`
// (FieldValue.serverTimestamp()) sur le doc cible. Le champ persiste,
// mais une reconnexion ultérieure remet `lastSignInTime` à jour, donc
// l'utilisateur n'est pas re-déconnecté en boucle.
// =====================================================================
(function () {
  function start() {
    if (typeof firebase === 'undefined' || !firebase.auth || !firebase.firestore) {
      setTimeout(start, 150);
      return;
    }

    var unsub = null;
    var loggingOut = false;

    firebase.auth().onAuthStateChanged(function (user) {
      try { if (unsub) unsub(); } catch (e) {}
      unsub = null;
      if (!user) return;

      var signInIso = user.metadata && user.metadata.lastSignInTime;
      var signInMs = signInIso ? new Date(signInIso).getTime() : Date.now();

      try {
        unsub = firebase.firestore().collection('users').doc(user.uid).onSnapshot(function (doc) {
          if (loggingOut || !doc.exists) return;
          var data = doc.data() || {};
          var force = data.forceLogoutAt;
          if (!force) return;
          var forceMs = 0;
          try {
            if (typeof force.toMillis === 'function') forceMs = force.toMillis();
            else if (force.seconds) forceMs = force.seconds * 1000;
          } catch (e) {}
          if (forceMs > 0 && forceMs > signInMs) {
            loggingOut = true;
            try { if (unsub) unsub(); } catch (e) {}
            try { if (typeof alert === 'function') alert('Vous avez été déconnecté par un administrateur.'); } catch (e) {}
            firebase.auth().signOut().catch(function () {}).then(function () {
              try { location.href = 'index.html'; } catch (e) {}
            });
          }
        }, function () {});
      } catch (e) {}
    });
  }
  start();
})();
