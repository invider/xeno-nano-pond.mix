function keyDown(e) {
    switch(e.code) {
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

    // dispatch to the active state
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.keyDown)) state.keyDown(e)
        if (state.trap && isFun(state.trap.keyDown)) state.trap.keyDown(e)
    }
}
