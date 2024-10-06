function launchCountdown() {
    this.timer = 1
}

function evo(dt) {
    if (this.timer > 0) {
        this.timer -= dt
        if (this.timer < 0) {
            this.timer = 0
            lab.control.screen.transitTo('pond')
        }
    }
}
