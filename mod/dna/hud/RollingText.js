const df = {
    background:   '#000000',
    textColor:    '#ffffff',
    font:         '16px jupiter-crash',
    lineHeight:   20,
    textAlign:    'center',
    textBaseline: 'middle',
    rx:           .5,
    ry:           .5,
    shadowDx:      5,
    shadowDy:      5,

    timer:         0,
    line:          0,
    lineTime:      1,
    lineSpeed:     -20,
    keepLineFor:   30,      // seconds
    sdx:           2,
    sdy:           2,
}

const Splash = require('/dna/hud/Splash')

class RollingText extends Splash {

    constructor(st) {
        super( extend({}, df, st) )
        this.lines = this.text.split('\n')
    }

    drawText() {
        // just adjust timings
        this.lineSpeed = -this.ih / this.keepLineFor
        this.lineTime = abs(this.lineHeight / this.lineSpeed)
    }

    evo(dt) {
        if (this.line >= this.lines.length) return // nothing to spawn

        this.timer += dt
        if (this.timer > this.lineTime) {
            this.timer -= this.lineTime

            const line = this.lines[ this.line++ ]
            const tx = this.ix + this.iw * this.rx
            const ty = this.iy + this.ih * this.ry

            this.__.rollLayer.spawn( dna.hud.FloatingText, {
                x:            tx,
                y:            ty,
                dx:           0,
                dy:           this.lineSpeed,
                text:         line,
                font:         this.font,
                color:        this.textColor,
                shadow:       this.shadowColor,
                base:         this.textBaseline,
                align:        this.textAlign,
                ttl:          this.keepLineFor,
                sdx:          this.sdx,
                sdy:          this.sdy,
            })
        }
    }
}
