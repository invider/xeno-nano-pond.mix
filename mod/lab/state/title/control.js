function onActivate() {
    this.launchCountdown()
}

function onDeactivate() {
}

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
    trap('menu')
}
