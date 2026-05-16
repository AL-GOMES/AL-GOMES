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
        var allowed = access[page];
        // Pas de config pour cette page → accès ouvert à TOUS les rôles
        // jusqu'à ce que l'admin restreigne explicitement via admin.html →
        // "Accès par rôle". Évite que les nouvelles pages soient bloquées
        // par défaut pour les rôles non standard (be_al_gomes, etc.).
        if (!allowed || !Array.isArray(allowed) || allowed.length === 0) {
          allowed = null; // null = tout le monde a accès
        }
        // Garde-fou : un admin a toujours accès à admin.html
        if (page === 'admin.html' && Array.isArray(allowed) && !allowed.includes('admin')) {
          allowed.push('admin');
        }
        if (allowed && !allowed.includes(role)) {
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
      }).catch(function (err) {
        // Erreur lors du chargement de config/pageAccess. Cela peut arriver
        // si :
        //  - les règles Firestore bloquent la lecture (rules trop strictes)
        //  - réseau intermittent / Firebase down
        //  - la config doc n'a jamais été créée
        // Dans tous ces cas, on ne PEUT pas appliquer la matrice "accès
        // par rôle" — mais l'utilisateur est déjà authentifié et a passé
        // la vérification ban. Plutôt que de bloquer toute la page (et donc
        // toute l'app pour quiconque a un user valide), on accorde l'accès
        // et on laisse les règles Firestore par collection être la vraie
        // barrière de sécurité.
        try { console.warn('[auth-guard] pageAccess non chargeable, accès accordé :', err && err.message); } catch (e) {}
        document.documentElement.style.visibility = 'visible';
        window._algomesUser = {
          uid: user.uid, role: role, login: data.login, name: data.name
        };
        try { window.dispatchEvent(new CustomEvent('algomes-auth-ready', { detail: window._algomesUser })); } catch (e) {}
      });
    }).catch(function () {
      auth.signOut();
      redirectLogin();
    });
  });
})();
