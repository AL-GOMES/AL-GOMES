/* =============================================================================
   firebase-init.js — Initialisation Firebase partagée
   À charger AVANT tout autre script Firebase de la page.
   Expose window.firebase, window.auth, window.db.

   Capture console.* dans un buffer localStorage partagé entre toutes les
   pages (et les iframes). Le panneau "Console live" d'admin.html lit ce
   buffer en temps réel via storage events pour permettre de partager
   des logs avec le développeur sans devoir ouvrir DevTools.
   ============================================================================= */

// ─── Blocage mobile/tablette ──────────────────────────────────────────────
// L'application est conçue pour desktop uniquement (Liseuse PDF, dossiers
// matériel, etc. nécessitent un grand écran). On détecte les appareils
// mobiles/tablettes par user-agent + taille d'écran. Le bandeau bloquant
// est dessiné dès que possible (DOMContentLoaded) pour empêcher toute
// interaction avant que les autres scripts ne s'initialisent.
(function () {
  var ua = navigator.userAgent || '';
  var isMobile = /iphone|ipod|android.*mobile|windows phone|blackberry|nokia|opera mini|opera mobi/i.test(ua);
  var isTablet = /ipad|tablet|kindle|silk|playbook/i.test(ua)
    || (/android/i.test(ua) && !/mobile/i.test(ua));
  // iPad sur iPadOS 13+ rapporte "Macintosh" mais a un écran tactile multi-points
  var isIPadPro = navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua) && 'ontouchend' in document;
  // Fallback : largeur d'écran physique inférieure à 1024px (déjouer UA spoof)
  var sw = window.screen.width || 0;
  var sh = window.screen.height || 0;
  var smallScreen = Math.max(sw, sh) < 1024;
  if (!isMobile && !isTablet && !isIPadPro && !smallScreen) return;
  // Bypass possible via ?desktop=1 (utile pour tester en émulation DevTools
  // ou pour les rares utilisateurs sur petit écran qui veulent forcer)
  if (/[?&]desktop=1\b/.test(window.location.search || '')) return;

  function showBlocker() {
    try {
      document.documentElement.style.background = '#0A0816';
      document.body.innerHTML =
        '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0A0816;color:#fff;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;text-align:center;padding:24px;z-index:99999">'
        + '<div style="font-size:72px;margin-bottom:24px">🖥️</div>'
        + '<h1 style="font-size:22px;font-weight:700;margin:0 0 16px;letter-spacing:1px">Accès uniquement depuis un ordinateur</h1>'
        + '<p style="font-size:14px;color:#b388ff;max-width:420px;line-height:1.6;margin:0 0 12px">'
        + 'L\'application AL-GOMES n\'est pas accessible depuis un smartphone ou une tablette.'
        + '</p>'
        + '<p style="font-size:13px;color:#888;max-width:420px;line-height:1.6;margin:0">'
        + 'Merci d\'utiliser un ordinateur (écran d\'au moins 1024px de large).'
        + '</p>'
        + '</div>';
    } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBlocker);
  } else {
    showBlocker();
  }
  // Empêche les scripts suivants (Firebase, etc.) de continuer comme si de
  // rien n'était. On throw → tous les scripts inline du même tag sont
  // interrompus, mais les autres scripts de la page se chargent. Le blocker
  // les masque visuellement.
  // Note : on ne return PAS du IIFE outer (qui continuerait firebase init) :
  // on stoppe l'évaluation du fichier entier.
  window.__algomesBlocked = true;
})();
// Si on est sur mobile/tablette, on stoppe ici (les vars window.firebase
// ne seront pas créées ; les pages enfants verront le blocker overlay).
if (window.__algomesBlocked) {
  // Inutile de continuer à charger firebase. Mais on doit terminer le
  // fichier proprement pour ne pas casser le parsing.
} else {
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
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'string') return arg;
    if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
    // Error : on garde nom + message + stack tronquée (les vraies erreurs
    // Firestore exposent souvent name + code + message dans des propriétés
    // non-enumérables, donc on les lit explicitement).
    if (arg instanceof Error) {
      var bits = [arg.name + ': ' + arg.message];
      if (arg.code) bits.push('code=' + arg.code);
      if (arg.stack) bits.push(String(arg.stack).split('\n').slice(0, 4).join(' | '));
      return bits.join(' ');
    }
    if (typeof Element !== 'undefined' && arg instanceof Element) {
      return '<' + arg.tagName.toLowerCase() + '>';
    }
    // JSON.stringify avec replacer qui gère :
    // - fonctions → [Function]
    // - références circulaires → [Circular]
    // - profondeur > 4 → [Deep]
    // - chaînes très longues → truncated
    try {
      var seen = new WeakSet();
      var depth = 0;
      var out = JSON.stringify(arg, function (k, v) {
        if (typeof v === 'function') return '[Function]';
        if (typeof v === 'string' && v.length > 200) return v.slice(0, 200) + '…';
        if (v && typeof v === 'object') {
          if (seen.has(v)) return '[Circular]';
          seen.add(v);
        }
        return v;
      });
      if (out !== undefined) return out.slice(0, 800);
    } catch (e) { /* fall through */ }
    // Repli : lister les propriétés énumérables si JSON.stringify a échoué.
    try {
      var keys = Object.keys(arg).slice(0, 10);
      var parts = keys.map(function (k) {
        var v = arg[k];
        if (v && typeof v === 'object') return k + ':[obj]';
        return k + ':' + String(v).slice(0, 80);
      });
      return '{' + parts.join(', ') + '}';
    } catch (e) {}
    // Dernier repli : Object.prototype.toString donne au moins le type
    try { return Object.prototype.toString.call(arg); } catch (e) {}
    return '[unstringifiable]';
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
} // fin de l'else (skip si appareil bloqué)
