/* =============================================================================
   auth-guard.js — Garde d'authentification + contrôle d'accès par page
   Pré-requis : firebase-init.js doit être chargé avant.
   Comportement :
     - cache la page tant que l'auth n'est pas vérifiée
     - si non connecté → redirige vers index.html (en cassant l'iframe via window.top)
     - si user.banned → message + signOut
     - si role n'a pas accès à la page (config/pageAccess) → message d'accès refusé
     - sinon, expose window._algomesUser = {uid, role, login, name}
     - en cas d'erreur réseau imprévue → redirect index.html (fail-closed,
       jamais fail-open avec page visible sans _algomesUser)
   ============================================================================= */
(function () {
  if (!window.auth || !window.db) {
    console.error('[auth-guard] firebase-init.js doit être chargé avant.');
    // Fail-closed : on garde la page cachée et on redirige vers login.
    document.documentElement.style.visibility = 'hidden';
    redirectLogin();
    return;
  }
  var page = (window.location.pathname.split('/').pop() || 'accueil.html');
  if (!page.endsWith('.html')) page += '.html';

  document.documentElement.style.visibility = 'hidden';

  // Casse les iframes imbriquées : tente window.top, puis parent, puis self.
  // Si on est dans une iframe sandbox sans allow-top-navigation, ces accès
  // peuvent throw → on retombe sur window.location.
  function redirectLogin() {
    try { if (window.top && window.top !== window) { window.top.location.href = 'index.html'; return; } } catch (e) {}
    try { if (window.parent && window.parent !== window) { window.parent.location.href = 'index.html'; return; } } catch (e) {}
    try { window.location.href = 'index.html'; } catch (e) {}
  }

  function showBlock(html) {
    document.documentElement.style.visibility = 'visible';
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;font-family:sans-serif;background:#0A0816;color:#fff;text-align:center;padding:20px">' +
      html + '</div>';
  }

  auth.onAuthStateChanged(function (user) {
    if (!user) {
      redirectLogin();
      return;
    }
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if (!doc.exists) {
        auth.signOut();
        redirectLogin();
        return;
      }
      var data = doc.data();
      if (data.banned) {
        auth.signOut();
        showBlock(
          '<div style="font-size:20px;color:#ff4466;margin-bottom:12px">Compte bloqué</div>' +
          '<div style="font-size:13px;color:#888">Contactez l\'administrateur.</div>'
        );
        return;
      }
      var role = data.role;
      db.collection('config').doc('pageAccess').get().then(function (cfgDoc) {
        var access = cfgDoc.exists ? cfgDoc.data() : {};
        var allowed = access[page] || ['admin', 'ingenieur', 'lecteur'];
        // Garde-fou : un admin a toujours accès à admin.html
        if (page === 'admin.html' && !allowed.includes('admin')) allowed.push('admin');
        if (!allowed.includes(role)) {
          showBlock(
            '<div style="font-size:20px;color:#E74C3C;margin-bottom:12px">Accès refusé</div>' +
            '<div style="font-size:13px;color:#888">Votre rôle (' + role + ') ne permet pas d\'accéder à cette page.</div>'
          );
          return;
        }
        document.documentElement.style.visibility = 'visible';
        window._algomesUser = {
          uid: user.uid, role: role, login: data.login, name: data.name
        };
        // Notifie les pages qui veulent réagir au moment où l'auth est validée
        try { window.dispatchEvent(new CustomEvent('algomes-auth-ready', { detail: window._algomesUser })); } catch (e) {}
      }).catch(function () {
        // Erreur réseau / Firestore lors du chargement de pageAccess → on
        // ne PEUT pas valider l'accès, donc on bloque l'utilisateur plutôt
        // que de rendre la page visible sans _algomesUser (qui ferait
        // crasher tous les autres scripts de la page).
        showBlock(
          '<div style="font-size:20px;color:#E74C3C;margin-bottom:12px">Erreur de chargement</div>' +
          '<div style="font-size:13px;color:#888">Impossible de vérifier vos accès. Rechargez la page.</div>'
        );
      });
    }).catch(function () {
      auth.signOut();
      redirectLogin();
    });
  });
})();
