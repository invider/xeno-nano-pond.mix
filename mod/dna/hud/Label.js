const df = {
    name:         'label',
    text:         'default',
    textColor:    '#ffffff',
    font:         '24px pixel-operator-8',
    textAlign:    'center',
    textBaseline: 'middle',
    rx:           .5,
    ry:           .5,
    shadowDx:      5,
    shadowDy:      5,
}

class Label {

    constructor(st) {
        extend(this, df, st)
    }

    draw() {
        save()

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
