function launchCountdown() {
    this.timer = 1
}

function evo(dt) {
    if (this.timer > 0) {
        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
            this.next()
        }
    }
}

function next() {
    lab.control.screen.transitTo('pond', {
        next: function() {
            //log('fading out from pond')
            lib.sfx('pop', 1)
        }
    })
}
