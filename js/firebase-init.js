/* =============================================================================
   firebase-init.js — Initialisation Firebase partagée
   À charger AVANT tout autre script Firebase de la page.
   Expose window.firebase, window.auth, window.db.
   ============================================================================= */
(function () {
  // Silencer console.log/warn/info/debug en production sauf si ?debug=1 dans l'URL.
  // console.error reste actif (pour ne pas masquer de vraies erreurs).
  try {
    var qs = (window.location.search || '');
    var isDebug = /[?&]debug=1\b/.test(qs) || (window.localStorage && localStorage.getItem('algomes_debug') === '1');
    if (!isDebug) {
      var noop = function () {};
      ['log', 'warn', 'info', 'debug'].forEach(function (k) {
        try { console[k] = noop; } catch (e) {}
      });
    }
  } catch (e) {}

  if (typeof firebase === 'undefined') {
    console.error('[firebase-init] firebase compat SDK non chargé. Ordre des <script> ?');
    return;
  }
  var fc = {
    apiKey: "AIzaSyAXuLjl6_yZNB28anBGSPP6PptugpkDJ4k",
    authDomain: "algomes-a4e46.firebaseapp.com",
    projectId: "algomes-a4e46",
    storageBucket: "algomes-a4e46.firebasestorage.app",
    messagingSenderId: "827799257472",
    appId: "1:827799257472:web:b2248e501a5f72b63ec165"
  };
  if (!firebase.apps.length) firebase.initializeApp(fc);
  // Raccourcis globaux
  window.auth = firebase.auth();
  window.db   = firebase.firestore();
})();
