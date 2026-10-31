/* Avviso cookie leggero di The Social Media Lab (sostituisce iubenda).
   Barra piccola in basso che non copre la pagina. Scelta salvata in localStorage («sml_cc»).
   «Rifiuta» revoca il pixel di Meta; nelle pagine il pixel legge la scelta prima di partire. */
(function () {
  var KEY = 'sml_cc';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  if (get()) return;

  function build() {
    var css = document.createElement('style');
    css.textContent =
      '.sml-cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:560px;margin:0 auto;' +
      'background:rgba(11,20,38,.96);border:1px solid rgba(0,212,255,.25);border-radius:14px;padding:10px 12px;' +
      'display:flex;align-items:center;gap:10px;font:400 12.5px/1.4 Inter,system-ui,sans-serif;color:#c8d6e5;' +
      'box-shadow:0 8px 30px rgba(0,0,0,.35);backdrop-filter:blur(8px)}' +
      '.sml-cc p{margin:0;flex:1}.sml-cc a{color:#00d4ff;text-decoration:underline}' +
      '.sml-cc button{flex-shrink:0;border:0;border-radius:99px;padding:7px 14px;font:600 12.5px Inter,system-ui,sans-serif;cursor:pointer}' +
      '.sml-cc .no{background:transparent;color:#c8d6e5;border:1px solid rgba(200,214,229,.3)}' +
      '.sml-cc .ok{background:linear-gradient(120deg,#00d4ff,#8b5cf6);color:#fff}';
    document.head.appendChild(css);
    var bar = document.createElement('div');
    bar.className = 'sml-cc';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie');
    bar.innerHTML = '<p>Usiamo cookie tecnici e il pixel di Meta per misurare le campagne. <a href="/privacy.html#cookie">Dettagli</a></p>' +
      '<button type="button" class="no">Rifiuta</button><button type="button" class="ok">Ok</button>';
    bar.querySelector('.no').onclick = function () {
      set('no');
      if (window.fbq) { try { fbq('consent', 'revoke'); } catch (e) {} }
      bar.remove();
    };
    bar.querySelector('.ok').onclick = function () {
      set('ok');
      if (window.fbq) { try { fbq('consent', 'grant'); } catch (e) {} }
      bar.remove();
    };
    document.body.appendChild(bar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
