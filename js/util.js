/* =============================================================================
   util.js — Utilitaires partagés
   ============================================================================= */
(function () {
  // Échappement HTML (caractères dangereux pour innerHTML)
  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  // Échappement attribut (idem mais retire les guillemets)
  function escAttr(s) {
    return esc(s);
  }

  // Format date FR depuis Firestore Timestamp ou Date
  function fmtDate(ts, opts) {
    if (!ts) return '—';
    var d = (ts.seconds != null) ? new Date(ts.seconds * 1000) : new Date(ts);
    if (isNaN(d.getTime())) return '—';
    var o = opts || { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleString('fr-FR', o);
  }

  // Génère un ID court
  function uid() {
    return 'id_' + Math.random().toString(36).slice(2, 9);
  }

  // Toast minimal (réutilisé si une zone #toast existe, sinon console)
  function toast(msg, type) {
    var t = document.getElementById('toast');
    if (!t) { console.log('[toast]', type || 'info', '—', msg); return; }
    t.textContent = msg;
    t.classList.add('visible');
    if (type === 'error') t.style.color = '#ff4466';
    else if (type === 'success') t.style.color = '#4ade80';
    else t.style.color = '';
    clearTimeout(t._timeout);
    t._timeout = setTimeout(function () { t.classList.remove('visible'); }, 2400);
  }

  // ─── Modales custom : remplaçants de alert / confirm / prompt ──────────────
  // - Style cohérent avec la charte AL.GOMES (dark + violet)
  // - DOM-safe : tous les textes affichés via textContent (pas d'innerHTML)
  // - Renvoient des Promises (compat async/await) :
  //     await algomesUtil.alert('Sauvegardé !')
  //     if (await algomesUtil.confirm('Supprimer ?')) doDelete();
  //     const name = await algomesUtil.prompt('Nom ?', 'default');
  //     if (name !== null) saveName(name);
  // - Échappable au clavier (Esc = annuler, Enter = OK pour alert/prompt)
  // - Le focus est trappé dans la modale tant qu'elle est ouverte.
  function injectModalStyles() {
    if (document.getElementById('algomes-modal-styles')) return;
    var s = document.createElement('style');
    s.id = 'algomes-modal-styles';
    s.textContent =
      '.algomes-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:99997;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);animation:algomesModalFade .12s ease}' +
      '@keyframes algomesModalFade{from{opacity:0}to{opacity:1}}' +
      '.algomes-modal-box{background:#14141c;border:1px solid rgba(120,50,255,.3);border-radius:12px;padding:24px;min-width:320px;max-width:480px;color:#e0d8ff;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,-apple-system,Segoe UI,sans-serif}' +
      '.algomes-modal-title{font-size:14px;font-weight:700;letter-spacing:1.5px;color:#d4b5ff;margin-bottom:12px;text-transform:uppercase}' +
      '.algomes-modal-msg{font-size:14px;line-height:1.5;color:#e0d8ff;margin-bottom:18px;white-space:pre-wrap;word-break:break-word}' +
      '.algomes-modal-input{width:100%;padding:10px 12px;background:rgba(120,50,255,.07);border:1px solid rgba(120,50,255,.3);border-radius:8px;color:#e0d8ff;font-size:14px;font-family:inherit;outline:none;margin-bottom:14px}' +
      '.algomes-modal-input:focus{border-color:rgba(120,50,255,.7);background:rgba(120,50,255,.12)}' +
      '.algomes-modal-buttons{display:flex;gap:10px;justify-content:flex-end}' +
      '.algomes-modal-btn{padding:9px 18px;border-radius:7px;font-family:inherit;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;transition:all .15s;border:1px solid transparent}' +
      '.algomes-modal-btn:focus-visible{outline:2px solid #b388ff;outline-offset:2px}' +
      '.algomes-modal-btn-primary{background:rgba(120,50,255,.2);color:#d4b5ff;border-color:rgba(120,50,255,.45)}' +
      '.algomes-modal-btn-primary:hover{background:rgba(120,50,255,.35)}' +
      '.algomes-modal-btn-danger{background:rgba(239,68,68,.15);color:#fca5a5;border-color:rgba(239,68,68,.4)}' +
      '.algomes-modal-btn-danger:hover{background:rgba(239,68,68,.3)}' +
      '.algomes-modal-btn-ghost{background:transparent;color:rgba(200,180,230,.7);border-color:rgba(120,50,255,.2)}' +
      '.algomes-modal-btn-ghost:hover{color:#d4b5ff;background:rgba(120,50,255,.08)}';
    (document.head || document.documentElement).appendChild(s);
  }

  // Construit la modale et retourne une Promise
  function buildModal(opts) {
    injectModalStyles();
    return new Promise(function (resolve) {
      var overlay = document.createElement('div');
      overlay.className = 'algomes-modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      var box = document.createElement('div');
      box.className = 'algomes-modal-box';

      // Titre
      if (opts.title) {
        var t = document.createElement('div');
        t.className = 'algomes-modal-title';
        t.textContent = opts.title;
        box.appendChild(t);
      }

      // Message (textContent → pas d'injection HTML possible)
      var m = document.createElement('div');
      m.className = 'algomes-modal-msg';
      m.textContent = opts.message || '';
      box.appendChild(m);

      // Input pour prompt
      var input = null;
      if (opts.type === 'prompt') {
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'algomes-modal-input';
        input.value = opts.defaultValue || '';
        if (opts.placeholder) input.placeholder = opts.placeholder;
        box.appendChild(input);
      }

      // Boutons
      var btns = document.createElement('div');
      btns.className = 'algomes-modal-buttons';

      function close(result) {
        try {
          document.removeEventListener('keydown', onKey, true);
          overlay.remove();
          if (lastFocus && lastFocus.focus) lastFocus.focus();
        } catch (e) {}
        resolve(result);
      }

      if (opts.type === 'confirm' || opts.type === 'prompt') {
        var bCancel = document.createElement('button');
        bCancel.type = 'button';
        bCancel.className = 'algomes-modal-btn algomes-modal-btn-ghost';
        bCancel.textContent = opts.cancelLabel || 'Annuler';
        bCancel.addEventListener('click', function () {
          close(opts.type === 'prompt' ? null : false);
        });
        btns.appendChild(bCancel);
      }

      var bOk = document.createElement('button');
      bOk.type = 'button';
      bOk.className = 'algomes-modal-btn ' + (opts.danger ? 'algomes-modal-btn-danger' : 'algomes-modal-btn-primary');
      bOk.textContent = opts.okLabel || 'OK';
      bOk.addEventListener('click', function () {
        if (opts.type === 'prompt') close(input ? input.value : '');
        else if (opts.type === 'confirm') close(true);
        else close();
      });
      btns.appendChild(bOk);
      box.appendChild(btns);

      // Click sur overlay = cancel (sauf alert)
      overlay.addEventListener('mousedown', function (e) {
        if (e.target === overlay && opts.type !== 'alert') {
          close(opts.type === 'prompt' ? null : false);
        }
      });

      // Clavier : Esc = cancel, Enter = OK
      function onKey(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          if (opts.type === 'alert') close();
          else close(opts.type === 'prompt' ? null : false);
        } else if (e.key === 'Enter' && opts.type !== 'confirm') {
          // pour confirm on évite le Enter par défaut (l'utilisateur doit
          // explicitement cliquer "OK" sur les actions destructives)
          if (document.activeElement === input || opts.type === 'alert') {
            e.preventDefault();
            if (opts.type === 'prompt') close(input ? input.value : '');
            else close();
          }
        } else if (e.key === 'Tab') {
          // Focus trap simple : si on tab depuis le dernier élément, retour au premier
          var focusables = box.querySelectorAll('input,button');
          if (!focusables.length) return;
          var first = focusables[0], last = focusables[focusables.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
          }
        }
      }
      document.addEventListener('keydown', onKey, true);

      overlay.appendChild(box);
      document.body.appendChild(overlay);

      // Focus initial
      var lastFocus = document.activeElement;
      setTimeout(function () {
        if (input) { input.focus(); input.select(); }
        else bOk.focus();
      }, 30);
    });
  }

  function alertModal(message, opts) {
    opts = opts || {};
    return buildModal({
      type: 'alert',
      title: opts.title,
      message: message,
      okLabel: opts.okLabel
    });
  }
  function confirmModal(message, opts) {
    opts = opts || {};
    return buildModal({
      type: 'confirm',
      title: opts.title || 'Confirmation',
      message: message,
      okLabel: opts.okLabel || 'Confirmer',
      cancelLabel: opts.cancelLabel,
      danger: opts.danger
    });
  }
  function promptModal(message, defaultValue, opts) {
    opts = opts || {};
    return buildModal({
      type: 'prompt',
      title: opts.title,
      message: message,
      defaultValue: defaultValue || '',
      placeholder: opts.placeholder,
      okLabel: opts.okLabel,
      cancelLabel: opts.cancelLabel
    });
  }

  window.algomesUtil = {
    esc: esc,
    escAttr: escAttr,
    fmtDate: fmtDate,
    uid: uid,
    toast: toast,
    alert: alertModal,
    confirm: confirmModal,
    prompt: promptModal
  };
})();
