const squareParticleTrait = {
    drawParticle: function() {
        fill(this.color)
        rect(this.x, this.y, this.r, this.r)
    }
}

let explosionId = 0
function explosion(source, x, y) {
    const color = hsl(.15, .7, .5)

    const st = {
        x: x,
        y: y,
        color: color,

        lifespan: .1,
        force: 1000,
        radius: 0,
        size: .1, vsize: .2,
        speed: 8, vspeed: 5,
        angle: 0, spread: TAU,
        minLifespan: 0.8, vLifespan: 1.2,

        onKill: function() {
            this.dead = true
            lab.limbo.explosion.keep(this)
        },
    }

    const emitter = lab.limbo.explosion.extract()
    if (emitter) {
        emitter.reignite(st)
        lab.mission.galaxy.fx.attach(emitter)
    } else {
        st.name = 'explosionVFX' + (++explosionId)
        log('new explostion: ' + st.name)
        lab.mission.galaxy.fx.spawn('Emitter', augment(st, squareParticleTrait))
    }
}

let debrisId = 0
function debrisDestruction(source, x, y) {
    const color = hsla(.1, 0, .6, .2)

    const st = {
        x: x,
        y: y,
        color: color,

        lifespan: 0.1,
        force:  1000,
        radius: 0,
        size: .2, vsize: .2,
        speed: 4, vspeed: 4,
        angle: 0, spread: TAU,
        minLifespan: .2, vLifespan: .2,

        onKill: function() {
            this.dead = true
            lab.limbo.debris.keep(this)
        },
    }

    const emitter = lab.limbo.debris.extract()
    if (emitter) {
        emitter.reignite(st)
        lab.port.fx.attach(emitter)
    } else {
        st.name = 'debrisVFX' + (++debrisId)
        const e = pin.galaxy.fx.spawn('Emitter', augment(st, squareParticleTrait))
    }
}

