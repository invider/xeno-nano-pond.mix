const WAIT     = 1
const FADE_IN  = 2
const KEEP     = 3
const FADE_OUT = 4
const DEAD     = 5

const df = {
    name:         'title',
    textColor:    '#ffffff',
    font:         '32px jupiter-crash',
    textAlign:    'center',
    textBaseline: 'middle',
    rx:           .5,
    ry:           .5,
    shadowDx:      5,
    shadowDy:      5,

    state:         WAIT,
    wait:          0,
    fadeIn:        1,
    keep:          1,
    fadeOut:       1,
}

class Title {

    constructor(st) {
        extend(this, df, st)
        this.timer = this.wait
    }

    evo(dt) {
        this.timer -= dt
        if (this.timer <= 0) {
            switch(this.state) {
                case WAIT:
                    this.state = FADE_IN
                    this.timer = this.fadeIn
                    break
                case FADE_IN:
                    this.state = KEEP
                    this.timer = this.keep
                    break
                case KEEP:
                    this.state = FADE_OUT
                    this.timer = this.fadeOut
                    break
                case FADE_OUT:
                    this.state = DEAD
                    kill(this)
                    break
            }
        }
    }

    draw() {
        if (this.state === WAIT || this.state === DEAD) return

        save()
        if (this.state === FADE_IN) {
            alpha(1 - this.timer/this.fadeIn)
        } else if (this.state === FADE_OUT) {
            alpha(this.timer/this.fadeOut)
        } else {
            alpha(1)
        }

        ctx.textBaseline = this.textBaseline
        ctx.textAlign = this.textAlign
        font(this.font)

        const tx = rx(this.rx)
        const ty = ry(this.ry)

        if (this.shadowColor) {
            fill(this.shadowColor)
            text(this.text, tx+this.shadowDx, ty+this.shadowDy)
        }

        fill(this.textColor)
        text(this.text, tx, ty)

        restore()
    }
}
