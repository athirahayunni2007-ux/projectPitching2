
let currentSize = parseInt(localStorage.getItem('cm_font_size')) || 16;

window.changeFontSize = function (action) {

    if (action === 'up') {
        if (currentSize < 24) currentSize += 2; // Increases master size
    } else if (action === 'down') {
        if (currentSize > 12) currentSize -= 2; // Decreases master size
    } else if (action === 'reset') {
        currentSize = 16; // Resets to default
    }

    // Save choice to browser memory
    localStorage.setItem('cm_font_size', currentSize);
    
    applyNewFontSize();
};

function applyNewFontSize() {
    document.documentElement.style.fontSize = currentSize + 'px';
}