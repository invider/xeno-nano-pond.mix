function keyDown(e) {
    env.touched = true
    switch(e.code) {
        case 'KeyP':
            if (env.screen === 'pond') {
                lab.pond.paused = !lab.pond.paused
            }
            break
    }
}
