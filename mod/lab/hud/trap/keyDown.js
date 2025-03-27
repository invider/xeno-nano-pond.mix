function keyDown(e) {
    if (e.repeat) return

    switch(e.code) {
        case 'Escape':
            trap('menu')
            break

        case 'KeyP':
            if (env.state === 'pond') {
                lab.pond.paused = !lab.pond.paused
                lib.sfx('uswitch')
            }
            break
        case 'KeyM':
            if (env.state === 'pond') {
                if (env.opt.mute) {
                    env.opt.mute = false
                    lib.sfx('uswitch')
                } else {
                    lib.sfx('uswitch')
                    env.opt.mute = true
                }
            }
            break
    }
}
