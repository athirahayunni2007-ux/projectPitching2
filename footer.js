/* Loads footer.html into <div id="cm-footer-slot"></div> via AJAX.
   Falls back silently if the file can't be fetched (e.g. opened with file://). */

(function () {

  // Inject current year into footer
  function injectYear() {
    var y = document.getElementById('cm-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // Adjust footer font size if accessibility scaling is active
  function adjustFooterFont() {
    var slot = document.getElementById('cm-footer-slot');
   
    // Only adjust if slot exists and currentScale is defined
    if (slot && typeof currentScale !== 'undefined' && currentScale > 100) {
      var footerTexts = slot.querySelectorAll('.cm-footer h4, .cm-footer h5, .cm-footer p, .cm-footer a, .cm-footer li');
      for (var i = 0; i < footerTexts.length; i++) {
        footerTexts[i].style.fontSize = (currentScale / 100) + 'em';
      }
    }
  }

  // Mount footer into slot
  function mount() {
    var slot = document.getElementById('cm-footer-slot');
    if (!slot) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'footer.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) {
          // Inject footer HTML
          slot.innerHTML = xhr.responseText;

          // Add dynamic year
          injectYear();

          // Adjust font size immediately after load
          adjustFooterFont();
        }
      }
    };
    try { xhr.send(); } catch (e) { /* ignore */ }
  }

  // Run mount after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();