/* Will loads footer.html into <div id="cm-footer-slot"></div> via AJAX.
   Falls back silently if the file can't be fetched (e.g. opened with file://). */
(function () {
  function injectYear() {
    var y = document.getElementById('cm-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function mount() {
    var slot = document.getElementById('cm-footer-slot');
    if (!slot) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'footer.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 0) {
          slot.innerHTML = xhr.responseText;
          injectYear();
        }
      }
    };
    try { xhr.send(); } catch (e) { /* ignore */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
