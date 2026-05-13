/* =============================================================================
   firebase-init.js — Initialisation Firebase partagée
   À charger AVANT tout autre script Firebase de la page.
   Expose window.firebase, window.auth, window.db.

   Capture console.* dans un buffer localStorage partagé entre toutes les
   pages (et les iframes). Le panneau "Console live" d'admin.html lit ce
   buffer en temps réel via storage events pour permettre de partager
   des logs avec le développeur sans devoir ouvrir DevTools.
   ============================================================================= */
(function () {
  // ─── Capture console.* dans un buffer localStorage ────────────────────────
  // Buffer en ring : conserve les MAX_LOGS dernières entrées. Chaque entrée :
  // { t: timestamp, lvl: 'log'|'warn'|'error'|'info'|'debug', p: page, m: message }
  // Le panneau admin lit ce buffer et écoute les storage events.
  var LOG_KEY = 'algomes_console_log';
  var MAX_LOGS = 500;
  var qs = (window.location.search || '');
  var isDebug = /[?&]debug=1\b/.test(qs) ||
    (window.localStorage && localStorage.getItem('algomes_debug') === '1');
  var pageId = (window.location.pathname.split('/').pop() || '').replace('.html', '') || 'root';

  function safeStringify(arg) {
    try {
      if (arg === null) return 'null';
      if (arg === undefined) return 'undefined';
      if (typeof arg === 'string') return arg;
      if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
      if (arg instanceof Error) return arg.name + ': ' + arg.message;
      if (arg instanceof Element) return '<' + arg.tagName.toLowerCase() + '>';
      return JSON.stringify(arg, function (k, v) {
        if (typeof v === 'function') return '[Function]';
        return v;
      }).slice(0, 600);
    } catch (e) { return '[unstringifiable]'; }
  }

  function pushLog(level, args) {
    try {
      var msg = Array.prototype.map.call(args, safeStringify).join(' ');
      var raw = localStorage.getItem(LOG_KEY) || '[]';
      var arr;
      try { arr = JSON.parse(raw); } catch (e) { arr = []; }
      if (!Array.isArray(arr)) arr = [];
      arr.push({ t: Date.now(), lvl: level, p: pageId, m: msg });
      if (arr.length > MAX_LOGS) arr = arr.slice(arr.length - MAX_LOGS);
      try { localStorage.setItem(LOG_KEY, JSON.stringify(arr)); } catch (e) {}
    } catch (e) { /* silent — ne jamais casser à cause du log */ }
  }

  // Wrapping console.* : on push toujours dans le buffer, mais on n'affiche
  // dans la vraie console que si isDebug (sauf .error qui passe toujours).
  var origConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    debug: (console.debug || console.log).bind(console)
  };
  ['log', 'warn', 'info', 'debug'].forEach(function (lvl) {
    console[lvl] = function () {
      pushLog(lvl, arguments);
      if (isDebug) try { origConsole[lvl].apply(null, arguments); } catch (e) {}
    };
  });
  console.error = function () {
    pushLog('error', arguments);
    try { origConsole.error.apply(null, arguments); } catch (e) {}
  };
  // Capture aussi les erreurs JS non gérées et les rejets de Promise.
  window.addEventListener('error', function (ev) {
    pushLog('error', [ev.message + (ev.filename ? ' @ ' + ev.filename.split('/').pop() + ':' + ev.lineno : '')]);
  });
  window.addEventListener('unhandledrejection', function (ev) {
    var r = ev.reason;
    pushLog('error', ['Unhandled promise: ' + safeStringify(r)]);
  });

  // API publique pour le panneau admin (et autres consommateurs)
  window.AlgomesLog = {
    getAll: function () {
      try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }
      catch (e) { return []; }
    },
    clear: function () {
      try { localStorage.removeItem(LOG_KEY); } catch (e) {}
    },
    MAX: MAX_LOGS,
    KEY: LOG_KEY
  };

  // ─── Init Firebase ────────────────────────────────────────────────────────
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
