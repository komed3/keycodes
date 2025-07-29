// Returns a readable string of all active modifier keys
function getModifiers ( e ) {

    const mods = [
        e.ctrlKey && 'Ctrl',
        e.shiftKey && 'Shift',
        e.altKey && 'Alt',
        e.metaKey && ( navigator.platform.startsWith( 'Mac' ) ? 'Cmd' : 'Meta' ),
        e.getModifierState?.( 'Fn' ) && 'Fn'
    ].filter( Boolean );

    return mods.join( ' + ' );

}

// Updates all key info fields in the UI
function updateKeyInfo ( e ) {

    const key = e.key === ' ' ? 'Space' : e.key;
    const mods = getModifiers( e );
    const combo = mods && e.key.length === 1 ? `${mods} + ${key}` : ( mods || key );

    const map = {
        'main-key': combo,
        'info-key': key,
        'info-code': e.code,
        'info-keycode': e.keyCode,
        'info-which': e.which,
        'info-location': e.location,
        'info-modifiers': mods || '–',
        'info-repeat': e.repeat ? 'Yes' : 'No',
        'info-composing': e.isComposing ? 'Yes' : 'No',
        'info-timestamp': Math.round( e.timeStamp ) + ' ms'
    };

    const lock = {
        'caps': 'CapsLock',
        'num': 'NumLock',
        'scroll': 'Scrolllock'
    };

    for ( const id in map ) {

        const el = document.getElementById( id );

        if ( el ) el.textContent = map[ id ];

    }

    for ( const id in lock ) {

        const el = document.getElementById( `info-${id}lock` );

        if ( el ) el.textContent = (
            e.getModifierState &&
            e.getModifierState( lock[ id ] )
        ) ? 'On' : 'Off';

    }

}

// Blocks as many default and OS actions as possible in the browser
function blockAll ( e ) {

    const forbidden = [
        'PrintScreen', 'ContextMenu',
        'F1', 'F3', 'F4', 'F5', 'F11', 'F12',
        'Meta', 'OS', 'Super',
        'LaunchApplication1', 'LaunchApplication2'
    ];

    if (
        e.ctrlKey || e.altKey || e.metaKey ||
        forbidden.includes( e.key ) ||
        forbidden.includes( e.code )
    ) {

        e.preventDefault();
        e.stopPropagation();

        return false;

    }

    e.preventDefault();
    e.stopPropagation();

    return false;

}

// Listen for all key events and block actions
[ 'keydown', 'keypress', 'keyup' ].forEach( type => {

    window.addEventListener( type, e => {

        if ( type === 'keydown' ) updateKeyInfo( e );

        blockAll( e );

    }, true );

} );

// Set initial UI state on load
document.addEventListener( 'DOMContentLoaded', () => {

    [
        'main-key', 'info-key', 'info-code',
        'info-keycode', 'info-which', 'info-location',
        'info-modifiers', 'info-repeat'
    ].forEach( id => {

        const el = document.getElementById( id );

        if ( el ) el.textContent = '–';

    } );

} );
