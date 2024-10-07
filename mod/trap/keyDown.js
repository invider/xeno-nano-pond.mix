function keyDown(e) {
    env.touched = true
    switch(e.code) {
        case 'KeyP':
            if (env.screen === 'pond') {
                lab.pond.paused = !lab.pond.paused
                lib.sfx('uswitch')
            }
            break
        case 'KeyM':
            if (env.screen === 'pond') {
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
