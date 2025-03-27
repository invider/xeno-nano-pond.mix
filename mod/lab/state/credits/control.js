function onActivate() {
    const __ = this.__

    // detach if already rolling
    __.apply(e => kill(e), e => e instanceof dna.hud.RollingText || e instanceof dna.hud.FloatingText)

    __.spawn( dna.hud.RollingText, {
        Z:           1,
        name:        'title',
        //img:         res.slides.migRisingUp,
        text:        env.credits,
        font:        env.style.font.credits.head,
        lineHeight:  env.style.font.credits.size * 1.5,
        textColor:   env.style.color.credits,
        shadowColor: env.style.color.creditsShadow,
        background:  env.style.color.creditsBack,
        rx:          .98,
        ry:          .9,
        textAlign:   'right',

        keepLineFor: 30, // seconds
        sdx:         2,
        sdy:         2,
    })

    this.launchCountdown()
}

function onDeactivate() {
}

function launchCountdown() {
    this.timer = 45
}

function next() {
    trap('menu')
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

