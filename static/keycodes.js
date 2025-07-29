// Helper function for readable modifier display
function getModifiers(e) {
    return [
        e.ctrlKey ? 'Ctrl' : null,
        e.shiftKey ? 'Shift' : null,
        e.altKey ? 'Alt' : null,
        e.metaKey ? (navigator.platform.startsWith('Mac') ? 'Cmd' : 'Meta') : null,
        e.getModifierState && e.getModifierState('Fn') ? 'Fn' : null
    ].filter(Boolean).join(' + ');
}

// Main function for displaying key data
function showKeyInfo(e) {
    e.preventDefault();
    e.stopPropagation();

    const main = document.querySelector('main');
    if (!main) return;

    // Gather all the information
    const keyInfo = [
        { label: 'Key', value: e.key },
        { label: 'Code', value: e.code },
        { label: 'KeyCode', value: e.keyCode },
        { label: 'Which', value: e.which },
        { label: 'Location', value: e.location },
        { label: 'Modifiers', value: getModifiers(e) || '–' },
        { label: 'Repeat', value: e.repeat ? 'Yes' : 'No' }
    ];

    // Build output HTML
    main.innerHTML = `
        <section class="key-info">
            <div class="key-main">
                <span class="key-main-label">Key</span>
                <span class="key-main-value">${e.key === ' ' ? 'Space' : e.key}</span>
            </div>
            <table>
                <tbody>
                    ${keyInfo.map(info => `
                        <tr>
                            <td>${info.label}</td>
                            <td><code>${info.value}</code></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="hint">Drücke eine andere Taste…</div>
        </section>
    `;
}

// Intercept all keystrokes
['keydown', 'keypress', 'keyup'].forEach(type => {
    window.addEventListener(type, e => {
        // Only display on keydown, but block all events
        if (type === 'keydown') showKeyInfo(e);
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);
});

// Block context menu and other actions
window.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}, true);

// Initial note
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <section class="key-info">
                <div class="hint">Drücke eine beliebige Taste…</div>
            </section>
        `;
    }
});