/**
 * CMS Loader - legge i file JSON del CMS e aggiorna i contenuti della pagina
 * Uso: aggiungi data-cms="path.to.field" agli elementi HTML
 *      e data-cms-href="path.to.link" per aggiornare href dei link
 */
(function() {
  // Determina quale file JSON caricare in base alla lingua della pagina
  var path = window.location.pathname;
  var lang = 'it';
  if (path.startsWith('/en/')) lang = 'en';
  else if (path.startsWith('/es/')) lang = 'es';

  // Determina quale file JSON caricare in base alla pagina
  // Per ora supportiamo la home - estendibile ad altre pagine
  var dataFile = null;
  if (path === '/' || path === '/index.html' || path === '/en/' || path === '/en/index.html' || path === '/es/' || path === '/es/index.html') {
    dataFile = '/_data/home_' + lang + '.json';
  }

  if (!dataFile) return;

  // Fetch del JSON con cache busting per vedere subito le modifiche
  fetch(dataFile + '?t=' + Date.now())
    .then(function(r) {
      if (!r.ok) throw new Error('CMS data not available');
      return r.json();
    })
    .then(function(data) {
      // Aggiorna testi
      document.querySelectorAll('[data-cms]').forEach(function(el) {
        var path = el.getAttribute('data-cms');
        var value = getNestedValue(data, path);
        if (value !== undefined && value !== null) {
          el.textContent = value;
        }
      });

      // Aggiorna link href
      document.querySelectorAll('[data-cms-href]').forEach(function(el) {
        var path = el.getAttribute('data-cms-href');
        var value = getNestedValue(data, path);
        if (value) el.setAttribute('href', value);
      });
    })
    .catch(function(err) {
      // Se fallisce, l'HTML statico resta visibile come fallback
      console.log('CMS loader: usando contenuti statici (fallback)', err.message);
    });

  function getNestedValue(obj, path) {
    return path.split('.').reduce(function(acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }
})();
