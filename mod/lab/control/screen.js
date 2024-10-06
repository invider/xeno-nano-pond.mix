function hidePond() {
    lab.pond.hide()
}

function showPond() {
    lab.pond.show()
}

function hideAllExcept(name) {
    if (name !== 'pond') hidePond()
    lab.screen._ls.forEach( screen => {
        if (screen.name !== name && screen.hide) {
            screen.hide()
        }
    })
}

function switchTo(name, st) {
    if (name === 'pond') {
        hideAllExcept('none')
        showPond()
    } else {
        hideAllExcept(name)
        lab.screen[name].show()
    }
    env.screen = name
    log(`switched to screen [${name}]`)
}

function transitTo(name, st) {
    if (name !== 'pond' && !lab.screen[name]) {
        throw `can't transit to unknown screen [${name}]`
    }
    log(`transiting to [${name}]`)

    const ts = {
        fadein:  2,
        keep:    0.5,
        fadeout: 2,

        onFadeout: function() {
            switchTo(name)
            if (this.next) this.next()
        }
    }
    augment(ts, st)
    lab.vfx.transit(ts)
}
