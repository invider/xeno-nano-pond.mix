const MAX_CONTROLLER = 8
const KEYBOARD_CONTROLLERS_BASE = 5

const UP     = 1    // movement
const LEFT   = 2
const DOWN   = 3
const RIGHT  = 4
const A      = 5    // actions
const B      = 6
const X      = 7
const Y      = 8
const L1     = 9    // supplemental
const R1     = 10
const L2     = 11
const R2     = 12
const MENU   = 13   // menu
const SELECT = 14

const actions = [
    'UP',
    'LEFT',
    'DOWN',
    'RIGHT',
    'A',
    'B',
    'X',
    'Y',
    'L1',
    'R1',
    'L2',
    'R2',
    'MENU',
    'SELECT',
]

// globally fixed keys with no remap
const fixed = {
    enter:          'Enter',
    escape:         'Escape',
    backspace:      'Backspace',
    startCheating:  'Backslash',

    pause:          'KeyP',
    //releaseAll:     'End',
    menu:           'Escape',
    zoomIn:         'Equal',
    zoomOut:        'Minus',
    autoZoom:       'Digit0',
    speedUp:        'BracketRight',
    slowDown:       'BracketLeft',
    speedNormal:    'Quote',
    rewind:         'Comma',
}

// keyboard players mapping
const keyboard = [
    // quaker
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD',
        'Space', 'AltLeft', 'KeyE', 'KeyQ',
        'KeyR', 'KeyF', 'KeyT', 'KeyG',
    ],
    // arrower
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'ControlRight', 'ShiftRight', 'End', 'Home',
        'PageUp', 'PageDown', 'Insert', 'Delete',
    ],
    // vimer
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL',
        'KeyN', 'KeyB', 'KeyY', 'KeyU',
        '', '', '', '',
    ],
    // numpader
    [
        'Numpad8', 'Numpad4', 'Numpad2', 'Numpad6',
        'Numpad0', 'NumpadSubtract', 'NumpadAdd', 'NumpadDivide',
        'Numpad9', 'Numpad3', 'NumpadDecimal', 'NumpadEnter'
    ],
]

const keyMap = {}

const padMap = [
    [12, 14, 13, 15, 0, 1, 2, 3, 8],
    [12, 14, 13, 15, 0, 1, 2, 3, 8],
    [12, 14, 13, 15, 0, 1, 2, 3, 8],
    [12, 14, 13, 15, 0, 1, 2, 3, 8],
]

// cheating combos
const combos = {
    test:  [UP, UP, DOWN, DOWN],
    debug: [UP, DOWN, UP, DOWN, A],
}

function indexKeys() {
    for (let p = 0; p < keyboard.length; p++) {
        const keyActions = keyboard[p]
        for (let a = 0; a < keyActions.length; a++) {
            const key = keyActions[a]
            keyMap[key] = {
                action: a + 1,
                controller: p + KEYBOARD_CONTROLLERS_BASE,
            }
        }
    }
}

function action(i) {
    return actions[i] || ''
}

function init() {
    indexKeys()
}
