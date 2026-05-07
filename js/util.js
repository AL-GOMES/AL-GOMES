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

  window.algomesUtil = { esc: esc, escAttr: escAttr, fmtDate: fmtDate, uid: uid, toast: toast };
})();
