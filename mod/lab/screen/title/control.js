function launchCountdown() {
    this.timer = 3
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
            trap('newGame')
        }
    })
}
