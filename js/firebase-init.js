/* =============================================================================
   firebase-init.js — Initialisation Firebase partagée
   À charger AVANT tout autre script Firebase de la page.
   Expose window.firebase, window.auth, window.db.
   ============================================================================= */
(function () {
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
