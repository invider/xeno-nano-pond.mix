function keyDown(e) {
    switch(e.code) {
        case 'KeyP':
            if (env.screen === 'pond') {
                lab.pond.paused = !lab.pond.paused
            }
            break
    }
}
