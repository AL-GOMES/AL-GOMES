/* =============================================================================
   cloud-sync.js — Synchronisation localStorage ↔ Firestore
   Charger APRÈS firebase-init.js dans chaque page qui a besoin de sync.
   API :
     window.cloudSync.bindKey('mykey')         // synchronise une clé exacte
     window.cloudSync.bindPrefix('algo-')      // synchronise toutes les clés commençant par X
     await window.cloudSync.ready              // promise résolue quand la sync initiale est faite
   Comportement :
     - Au démarrage : lit Firestore et met à jour localStorage avant que la page n'en ait besoin
     - À chaque écriture localStorage : push vers Firestore (anti-rafale 400ms)
     - Temps réel : onSnapshot → si modif venant d'un autre poste → update localStorage
                   + déclenche un 'storage' event (les pages réactives se mettent à jour seules)
                   + propose un Recharger flottant pour les pages non réactives
     - Cloisonnement : 1 doc Firestore par couple (utilisateur, clé) — collection 'localStorageSync'
   ============================================================================= */
(function () {
  'use strict';
  if (window.cloudSync) return; // évite la double-init

  // ─────── CONFIG ────────────────────────────────────────────────
  const CFG = {
    collection: 'localStorageSync',
    debounceMs: 400,         // anti-rafale entre 2 écritures
    splashTimeoutMs: 6000,   // si Firestore est inaccessible, on continue après 6s
  };

  // ─────── ÉTAT ──────────────────────────────────────────────────
  const S = {
    user: null,
    boundKeys: new Set(),
    boundPrefixes: new Set(),
    pendingWrites: new Map(),    // key -> timeoutId
    lastLocalWriteTs: new Map(), // key -> ts (anti-écho on snapshot)
    listeners: new Map(),        // key -> unsubscribe fn
    isReady: false,
    readyResolve: null,
    readyPromise: null,
  };
  S.readyPromise = new Promise(r => S.readyResolve = r);

  // ─────── STYLES ────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('cloud-sync-styles')) return;
    const s = document.createElement('style');
    s.id = 'cloud-sync-styles';
    s.textContent = `
      #cs-splash{position:fixed;inset:0;background:rgba(10,10,18,.92);backdrop-filter:blur(8px);z-index:2147483640;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;font-family:'Rajdhani',system-ui,sans-serif;color:#e0d8ff;transition:opacity .3s;visibility:visible!important}
      #cs-splash.fade{opacity:0;pointer-events:none}
      #cs-splash .cs-spin{width:42px;height:42px;border:3px solid rgba(120,50,255,.15);border-top-color:#7832ff;border-radius:50%;animation:csspin .8s linear infinite}
      #cs-splash .cs-msg{font-size:13px;letter-spacing:2px;color:rgba(180,160,255,.7);text-transform:uppercase}
      @keyframes csspin{to{transform:rotate(360deg)}}
      #cs-indicator{position:fixed;bottom:14px;right:14px;z-index:2147483641;background:rgba(20,20,28,.94);border:1px solid var(--cs-border,rgba(120,50,255,.25));border-radius:8px;padding:7px 12px;font-family:'Rajdhani',system-ui,sans-serif;font-size:12px;letter-spacing:.5px;color:#c0b8d8;display:flex;align-items:center;gap:7px;box-shadow:0 6px 24px rgba(0,0,0,.4);transition:all .25s;user-select:none;pointer-events:none;visibility:visible!important}
      #cs-indicator.hidden{opacity:0;transform:translateY(8px)}
      #cs-indicator .cs-dot{width:8px;height:8px;border-radius:50%;background:#94a3b8;transition:all .25s}
      #cs-indicator.syncing .cs-dot{background:#fbbf24;animation:cspulse 1s infinite}
      #cs-indicator.synced{color:#86efac}#cs-indicator.synced .cs-dot{background:#22c55e}
      #cs-indicator.error{color:#fca5a5}#cs-indicator.error .cs-dot{background:#ef4444;animation:cspulse 1s infinite}
      #cs-indicator.offline{color:#94a3b8}#cs-indicator.offline .cs-dot{background:#94a3b8}
      @keyframes cspulse{0%,100%{opacity:1}50%{opacity:.4}}
      #cs-reload-toast{position:fixed;bottom:60px;right:14px;z-index:2147483642;background:rgba(20,20,28,.97);border:1px solid rgba(120,50,255,.4);border-radius:10px;padding:14px 18px;font-family:'Rajdhani',system-ui,sans-serif;color:#e0d8ff;box-shadow:0 10px 30px rgba(0,0,0,.5);max-width:320px;display:none;flex-direction:column;gap:8px}
      #cs-reload-toast.on{display:flex}
      #cs-reload-toast .cs-rt-title{font-size:13px;font-weight:700;color:#d4b5ff;letter-spacing:1px}
      #cs-reload-toast .cs-rt-msg{font-size:12px;color:rgba(200,180,230,.75);line-height:1.4}
      #cs-reload-toast .cs-rt-btns{display:flex;gap:6px;margin-top:4px}
      #cs-reload-toast button{flex:1;padding:6px 10px;border-radius:6px;border:1px solid rgba(120,50,255,.3);background:rgba(120,50,255,.12);color:#d4b5ff;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:1px;cursor:pointer;text-transform:uppercase}
      #cs-reload-toast button:hover{background:rgba(120,50,255,.25)}
      #cs-reload-toast button.cs-rt-cancel{background:transparent;color:rgba(200,180,230,.5);border-color:rgba(120,50,255,.15)}
    `;
    document.head.appendChild(s);
  }

  function showSplash(msg) {
    let el = document.getElementById('cs-splash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cs-splash';
      el.innerHTML = '<div class="cs-spin"></div><div class="cs-msg">' + (msg || 'Synchronisation cloud…') + '</div>';
      document.documentElement.appendChild(el);
    }
  }
  function hideSplash() {
    const el = document.getElementById('cs-splash');
    if (!el) return;
    el.classList.add('fade');
    setTimeout(() => { try { el.remove(); } catch (e) {} }, 350);
  }

  function ensureIndicator() {
    let el = document.getElementById('cs-indicator');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'cs-indicator';
    el.className = 'hidden';
    el.innerHTML = '<span class="cs-dot"></span><span class="cs-label">…</span>';
    if (document.body) document.body.appendChild(el); else document.documentElement.appendChild(el);
    return el;
  }
  function setIndicator(status, label) {
    const el = ensureIndicator();
    el.classList.remove('hidden', 'syncing', 'synced', 'error', 'offline');
    el.classList.add(status);
    el.querySelector('.cs-label').textContent = label || status;
    if (status === 'synced') {
      clearTimeout(el._hideT);
      el._hideT = setTimeout(() => el.classList.add('hidden'), 1800);
    }
  }

  function showReloadToast(authorName) {
    let el = document.getElementById('cs-reload-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cs-reload-toast';
      el.innerHTML = ''
        + '<div class="cs-rt-title">📥 Données mises à jour</div>'
        + '<div class="cs-rt-msg cs-rt-msg-content"></div>'
        + '<div class="cs-rt-btns">'
        +   '<button class="cs-rt-reload">Recharger</button>'
        +   '<button class="cs-rt-cancel">Plus tard</button>'
        + '</div>';
      document.body.appendChild(el);
      el.querySelector('.cs-rt-reload').onclick = () => window.location.reload();
      el.querySelector('.cs-rt-cancel').onclick = () => el.classList.remove('on');
    }
    const msg = authorName
      ? 'Modifications reçues de ' + authorName + '. Rechargez pour voir la version à jour.'
      : 'De nouvelles données sont disponibles. Rechargez pour les voir.';
    el.querySelector('.cs-rt-msg-content').textContent = msg;
    el.classList.add('on');
    clearTimeout(el._hideT);
    el._hideT = setTimeout(() => el.classList.remove('on'), 12000);
  }

  // ─────── UTILITAIRES ───────────────────────────────────────────
  function sanitizeKey(key) {
    return String(key).replace(/[^a-zA-Z0-9_-]/g, '_');
  }
  function docIdFor(key) {
    if (!S.user) return null;
    return S.user.uid + '__' + sanitizeKey(key);
  }
  function keyMatches(key) {
    if (S.boundKeys.has(key)) return true;
    for (const p of S.boundPrefixes) if (key.startsWith(p)) return true;
    return false;
  }

  // ─────── HANDLES FIREBASE (local OU via iframe parent) ─────────
  // ATTESTATIONS et AUTOCONTROLE ne chargent pas Firebase localement, ils utilisent
  // l'instance du parent (accueil.html). On gère les deux cas transparemment.
  function getHandles() {
    // 1. Local (cas page standalone qui charge firebase-init.js)
    if (typeof firebase !== 'undefined' && window.db && window.auth) {
      return { firebase: firebase, db: window.db, auth: window.auth, fromParent: false };
    }
    // 2. Parent (cas iframe sous accueil.html)
    try {
      const p = window.parent;
      if (p && p !== window && p.firebase && p.db) {
        return { firebase: p.firebase, db: p.db, auth: p.auth, fromParent: true };
      }
    } catch (e) {}
    return null;
  }

  // ─────── HOOK LOCALSTORAGE ─────────────────────────────────────
  const ORIG_SET = window.localStorage.setItem.bind(window.localStorage);
  const ORIG_REMOVE = window.localStorage.removeItem.bind(window.localStorage);
  window.localStorage.setItem = function (key, value) {
    ORIG_SET(key, value);
    if (S.isReady && keyMatches(key)) pushToFirestore(key, value);
  };
  window.localStorage.removeItem = function (key) {
    ORIG_REMOVE(key);
    if (S.isReady && keyMatches(key)) pushToFirestore(key, null);
  };

  // ─────── PUSH (écriture locale → cloud) ────────────────────────
  function pushToFirestore(key, value) {
    const h = getHandles();
    if (!S.user || !h) return;
    if (S.pendingWrites.has(key)) clearTimeout(S.pendingWrites.get(key));
    setIndicator('syncing', 'Sync…');
    const tid = setTimeout(async () => {
      S.pendingWrites.delete(key);
      const docId = docIdFor(key);
      const ts = Date.now();
      S.lastLocalWriteTs.set(key, ts);
      try {
        await h.db.collection(CFG.collection).doc(docId).set({
          uid: S.user.uid, key: key, value: value,
          updatedAt: h.firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: S.user.uid,
          updatedByName: S.user.name || S.user.login || '',
          _localTs: ts,
        });
        setIndicator('synced', 'Sync ✓');
      } catch (err) {
        console.error('[cloud-sync] push failed', key, err);
        setIndicator('error', 'Erreur');
      }
    }, CFG.debounceMs);
    S.pendingWrites.set(key, tid);
  }

  // ─────── PULL (lecture initiale + abonnement temps réel) ───────
  async function pullAndSubscribe(key) {
    const h = getHandles();
    if (!S.user || !h) return;
    const docId = docIdFor(key);
    try {
      // Lecture initiale synchrone (await)
      const snap = await h.db.collection(CFG.collection).doc(docId).get();
      if (snap.exists) {
        const data = snap.data();
        if (data.value === null) {
          ORIG_REMOVE(key);
        } else if (typeof data.value === 'string') {
          const current = window.localStorage.getItem(key);
          if (current !== data.value) {
            ORIG_SET(key, data.value);
          }
        }
      } else {
        // Pas de version cloud : pousser le local si non vide
        const current = window.localStorage.getItem(key);
        if (current !== null) pushToFirestore(key, current);
      }
      // Abonnement temps réel
      const unsub = h.db.collection(CFG.collection).doc(docId).onSnapshot(
        snap => {
          if (!snap.exists) return;
          const data = snap.data();
          // Ignorer nos propres écritures (anti-écho)
          if (data._localTs && data._localTs === S.lastLocalWriteTs.get(key)) return;
          // Ignorer si c'est nous-même qui avons écrit récemment
          if (data.updatedBy === S.user.uid && Date.now() - (S.lastLocalWriteTs.get(key) || 0) < 2000) return;
          // Mise à jour locale
          const cur = window.localStorage.getItem(key);
          let newVal = (data.value === null) ? null : data.value;
          if (newVal === null && cur === null) return;
          if (newVal === cur) return;
          if (newVal === null) ORIG_REMOVE(key);
          else ORIG_SET(key, newVal);
          // Émettre un storage event (les pages réactives se mettront à jour seules)
          try {
            window.dispatchEvent(new StorageEvent('storage', {
              key: key,
              oldValue: cur,
              newValue: newVal,
              storageArea: window.localStorage,
              url: window.location.href,
            }));
          } catch (e) {}
          // Proposer un rechargement (au cas où la page ne réagit pas au storage event)
          if (data.updatedBy !== S.user.uid) {
            showReloadToast(data.updatedByName);
          }
        },
        err => {
          console.warn('[cloud-sync] snapshot error', key, err);
        }
      );
      S.listeners.set(key, unsub);
    } catch (err) {
      console.warn('[cloud-sync] pull failed', key, err);
    }
  }

  // Pour les préfixes : on charge initialement TOUTES les clés Firestore correspondantes
  async function pullPrefix(prefix) {
    const h = getHandles();
    if (!S.user || !h) return;
    try {
      const qs = await h.db.collection(CFG.collection)
        .where('uid', '==', S.user.uid)
        .get();
      qs.forEach(doc => {
        const data = doc.data();
        if (data.key && data.key.startsWith(prefix)) {
          if (data.value === null) {
            ORIG_REMOVE(data.key);
          } else if (typeof data.value === 'string') {
            const cur = window.localStorage.getItem(data.key);
            if (cur !== data.value) ORIG_SET(data.key, data.value);
          }
          // Abonnement temps réel pour cette clé
          if (!S.listeners.has(data.key)) pullAndSubscribe(data.key);
        }
      });
    } catch (err) {
      console.warn('[cloud-sync] pullPrefix failed', prefix, err);
    }
  }

  // ─────── RÉCUPÉRATION UTILISATEUR ──────────────────────────────
  function getUser() {
    // 1. Si auth-guard.js a déjà validé l'utilisateur
    if (window._algomesUser && window._algomesUser.uid) {
      return Promise.resolve(window._algomesUser);
    }
    // 2. Cas iframe sous accueil.html
    try {
      if (window.parent && window.parent !== window && window.parent._algomesUser && window.parent._algomesUser.uid) {
        return Promise.resolve(window.parent._algomesUser);
      }
    } catch (e) {}
    // 3. Attendre l'event 'algomes-auth-ready' émis par auth-guard.js
    //    OU le callback firebase auth.onAuthStateChanged (fallback)
    return new Promise(resolve => {
      let resolved = false;
      const onReady = e => {
        if (resolved) return;
        resolved = true; clearTimeout(to);
        resolve(e.detail || window._algomesUser);
      };
      window.addEventListener('algomes-auth-ready', onReady, { once: true });
      const h = getHandles();
      if (h && h.auth) {
        h.auth.onAuthStateChanged(async u => {
          if (resolved || !u) return;
          resolved = true; clearTimeout(to);
          try {
            const doc = await h.db.collection('users').doc(u.uid).get();
            resolve(doc.exists ? Object.assign({ uid: u.uid }, doc.data()) : { uid: u.uid });
          } catch (e) { resolve({ uid: u.uid }); }
        });
      }
      const to = setTimeout(() => {
        if (resolved) return;
        resolved = true;
        window.removeEventListener('algomes-auth-ready', onReady);
        resolve(null);
      }, CFG.splashTimeoutMs);
    });
  }

  // ─────── INITIALISATION ────────────────────────────────────────
  let initStarted = false;
  async function init() {
    if (initStarted) return;
    initStarted = true;
    injectStyles();
    // On affiche le splash UNIQUEMENT si au moins une clé a été bindée
    // (sinon, c'est le module qui charge mais qu'on n'utilise pas)
    setTimeout(() => {
      if (!S.isReady && (S.boundKeys.size > 0 || S.boundPrefixes.size > 0)) showSplash();
    }, 50);

    if (!getHandles()) {
      console.warn('[cloud-sync] Firebase non disponible, mode local seul');
      finishInit(false);
      return;
    }
    const user = await getUser();
    if (!user || !user.uid) {
      console.warn('[cloud-sync] Pas d\'utilisateur authentifié');
      finishInit(false);
      return;
    }
    S.user = user;

    // Pull initial pour toutes les clés bindées (en parallèle)
    const pulls = [];
    S.boundKeys.forEach(k => pulls.push(pullAndSubscribe(k)));
    S.boundPrefixes.forEach(p => pulls.push(pullPrefix(p)));
    try { await Promise.all(pulls); } catch (e) { console.warn('[cloud-sync] pulls partial fail', e); }

    finishInit(true);
  }

  function finishInit(success) {
    S.isReady = true;
    hideSplash();
    if (success && (S.boundKeys.size > 0 || S.boundPrefixes.size > 0)) {
      setIndicator('synced', 'Sync ✓');
    } else if (S.boundKeys.size > 0 || S.boundPrefixes.size > 0) {
      setIndicator('offline', 'Local');
    }
    S.readyResolve();
  }

  // ─────── API PUBLIQUE ──────────────────────────────────────────
  function bindKey(key) {
    if (typeof key !== 'string' || !key) return;
    S.boundKeys.add(key);
    // Si l'init est déjà finie, on souscrit immédiatement
    if (S.isReady && S.user) pullAndSubscribe(key);
    // Si l'init n'a pas commencé, on lance (chaque bindKey re-déclenche un init si nécessaire)
    if (!initStarted) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => init());
      } else {
        init();
      }
    } else if (!S.isReady) {
      // init en cours, on attend qu'il finisse — bindKey sera intégré au passage si appelé avant pull
    }
  }
  function bindPrefix(prefix) {
    if (typeof prefix !== 'string' || !prefix) return;
    S.boundPrefixes.add(prefix);
    if (S.isReady && S.user) pullPrefix(prefix);
    if (!initStarted) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => init());
      } else {
        init();
      }
    }
  }

  window.cloudSync = {
    bindKey: bindKey,
    bindPrefix: bindPrefix,
    get ready() { return S.readyPromise; },
    get user() { return S.user; },
    get isReady() { return S.isReady; },
  };
})();
