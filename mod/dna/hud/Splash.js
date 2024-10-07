const df = {
    background:   '#000000',
    textColor:    '#ffffff',
    font:         '32px jupiter-crash',
    textAlign:    'center',
    textBaseline: 'middle',
    rx:           .5,
    ry:           .5,
    shadowDx:      5,
    shadowDy:      5,
}

class Splash {

    constructor(st) {
        extend(this, df, st)
    }

    init(e) {
        //this.__.captureControl(this)
    }

    evo(dt) {
        this.timer -= dt
        if (this.timer <= 0) {
            this.__.pause()
            if (this.onTimeout) this.onTimeout()
        }
    }

    timeout(seconds, onTimeout) {
        this.timer = seconds
        this.onTimeout = onTimeout
    }

    drawBackground() {
        if (!this.background) return
        background(this.background)
    }

    drawImage() {
        if (!this.img) return

        const screenAspect = ctx.width / ctx.height
        const imgAspect = this.img.width / this.img.height

        if (screenAspect > imgAspect) {
            this.ih = ctx.height
            this.iw = this.ih * imgAspect
            this.ix = (ctx.width - this.iw)/2
            this.iy = 0
            image(this.img, this.ix, this.iy, this.iw, this.ih)
        } else {
            this.iw = ctx.width
            this.ih = this.iw / imgAspect
            this.ix = 0
            this.iy = (ctx.height-this.ih)/2
            image(this.img, this.ix, this.iy, this.iw, this.ih)
        }
    }

    drawText() {
        if (!this.text) return

        ctx.textBaseline = this.textBaseline
        ctx.textAlign = this.textAlign
        font(this.font)

        const tx = this.ix + this.iw * this.rx
        const ty = this.iy + this.ih * this.ry

        if (this.shadowColor) {
            fill(this.shadowColor)
            text(this.text, tx+this.shadowDx, ty+this.shadowDy)
        }

        fill(this.textColor)
        text(this.text, tx, ty)
    }

    adjust() {
        this.ix = 0
        this.iy = 0
        this.iw = ctx.width
        this.ih = ctx.height
    }

    draw() {
        this.adjust()
        this.drawBackground()
        this.drawImage()
        this.drawText()
    }

    act(action) {}

    stop(action) {
        this.timer = 0
    }
}
