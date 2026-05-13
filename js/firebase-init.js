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
  var REC_KEY = 'algomes_recording_since';  // timestamp ms si recording actif, sinon absent
  window.AlgomesLog = {
    getAll: function () {
      try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }
      catch (e) { return []; }
    },
    clear: function () {
      try { localStorage.removeItem(LOG_KEY); } catch (e) {}
    },
    // True si un enregistrement est en cours (flag posé par le bouton flottant).
    isRecording: function () {
      try { return !!localStorage.getItem(REC_KEY); } catch (e) { return false; }
    },
    // Récupère uniquement les logs collectés depuis le début de l'enregistrement.
    getSinceRecording: function () {
      var since;
      try { since = parseInt(localStorage.getItem(REC_KEY) || '0', 10); } catch (e) { since = 0; }
      var all = window.AlgomesLog.getAll();
      return since ? all.filter(function (e) { return e.t >= since; }) : all;
    },
    startRecording: function () {
      try {
        window.AlgomesLog.clear();
        localStorage.setItem(REC_KEY, String(Date.now()));
      } catch (e) {}
    },
    stopRecording: function () {
      var logs = window.AlgomesLog.getSinceRecording();
      try { localStorage.removeItem(REC_KEY); } catch (e) {}
      return logs;
    },
    MAX: MAX_LOGS,
    KEY: LOG_KEY,
    REC_KEY: REC_KEY
  };

  // ─── Bouton flottant DEBUG (toutes les pages) ─────────────────────────────
  // Petit bouton discret en bas à droite. Clic → démarre l'enregistrement
  // (clear + flag + indicateur REC). Re-clic → arrête + copie tout au
  // presse-papier en un seul geste. Visible aussi dans les iframes pour
  // capturer le contexte de la page courante.
  function installDebugButton() {
    if (window.top !== window) {
      // Dans une iframe : pas de bouton (l'iframe est déjà sous le shell qui
      // a son propre bouton). On affiche juste un éventuel indicateur si on
      // est en train d'enregistrer.
      injectRecBadgeIfNeeded();
      return;
    }
    if (document.getElementById('algomes-debug-fab')) return;
    var style = document.createElement('style');
    style.textContent =
      '#algomes-debug-fab{position:fixed;bottom:14px;right:14px;z-index:99999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:system-ui,sans-serif}' +
      '#algomes-debug-fab button{border:0;border-radius:24px;padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:0.5px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.4);display:inline-flex;align-items:center;gap:8px;transition:transform .12s,opacity .12s;color:#fff}' +
      '#algomes-debug-fab button:hover{transform:translateY(-1px)}' +
      '#algomes-debug-fab .fab-start{background:linear-gradient(135deg,#7c3aed,#5b21b6);opacity:.55}' +
      '#algomes-debug-fab:hover .fab-start{opacity:1}' +
      '#algomes-debug-fab .fab-stop{background:linear-gradient(135deg,#dc2626,#991b1b);animation:algoBlink 1.2s ease infinite}' +
      '#algomes-debug-fab .fab-dot{width:8px;height:8px;border-radius:50%;background:#fff}' +
      '#algomes-debug-fab .fab-stop .fab-dot{background:#fef2f2;box-shadow:0 0 8px #fff}' +
      '@keyframes algoBlink{0%,100%{box-shadow:0 4px 12px rgba(220,38,38,0.5)}50%{box-shadow:0 4px 20px rgba(220,38,38,0.95)}}';
    document.head.appendChild(style);

    var container = document.createElement('div');
    container.id = 'algomes-debug-fab';
    document.body.appendChild(container);

    function render() {
      var recording = window.AlgomesLog.isRecording();
      container.innerHTML = '';
      var btn = document.createElement('button');
      btn.type = 'button';
      if (recording) {
        btn.className = 'fab-stop';
        btn.title = 'Arrête l\'enregistrement et copie les logs au presse-papier';
        btn.innerHTML = '<span class="fab-dot"></span> ⏹ ARRÊTER & COPIER';
        btn.onclick = function () {
          var logs = window.AlgomesLog.stopRecording();
          var text = logs.map(function (e) {
            var d = new Date(e.t);
            var ts = d.toLocaleTimeString('fr-FR', { hour12: false }) + '.' + String(d.getMilliseconds()).padStart(3, '0');
            return ts + ' ' + (e.lvl || 'log').toUpperCase().padEnd(5) + ' [' + (e.p || '?') + '] ' + (e.m || '');
          }).join('\n');
          if (!text) {
            alert('Aucun log capturé. Reproduis le bug pendant que l\'enregistrement est actif.');
            render();
            return;
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
              function () { alert('✅ ' + logs.length + ' lignes copiées dans le presse-papier.\nColle-les dans la conversation.'); },
              function () { showFallback(text); }
            );
          } else {
            showFallback(text);
          }
          render();
        };
      } else {
        btn.className = 'fab-start';
        btn.title = 'Démarrer la capture des logs pour partager au développeur';
        btn.innerHTML = '<span class="fab-dot"></span> ▶ DÉMARRER LE LOG';
        btn.onclick = function () {
          window.AlgomesLog.startRecording();
          render();
        };
      }
      container.appendChild(btn);
    }
    function showFallback(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:10vh;left:5vw;width:90vw;height:80vh;z-index:99999;font-family:monospace;font-size:11px;padding:12px;background:#0a0d14;color:#cbd5e1;border:1px solid #7c3aed;border-radius:8px';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      alert('Sélection automatique faite. Ctrl+C pour copier puis ferme cette zone.');
      ta.addEventListener('blur', function () { try { ta.remove(); } catch (e) {} });
    }
    render();
    // Re-render sur events storage (autres onglets/iframes)
    window.addEventListener('storage', function (ev) {
      if (ev.key === REC_KEY) render();
    });
  }
  function injectRecBadgeIfNeeded() {
    // Dans les iframes : on n'affiche pas le bouton, juste les logs continuent
    // d'être capturés via console.* wrap. Pas de DOM à injecter.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installDebugButton, { once: true });
  } else {
    installDebugButton();
  }

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
