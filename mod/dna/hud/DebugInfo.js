/*
 * Debug information node.
 *
 * Set env.debug = true to enable
 */

const df = {
    name:       'debugInfo',
    color:      hsl(.14, .6, .5),
    background: '#000000A0',
    margin:     8,
    rx:         0,
    ry:         0,
}

class DebugInfo {

    constructor(st) {
        extend(this, df, st)
        this.keys = {}
        this.icons = {}
    }

    set(key, msg, icon) {
        this.keys[key] = msg
        this.icons[key] = icon
        if (!msg) delete this.keys[key]
    }

    setAll(st) {
        if (!st) return

        const keys = this.keys
        Object.keys(st).forEach(k => {
            keys[k] = st[k]
        })
    }

    isSet(key) {
        return !!(this.keys[key])
    }

    reset() {
        this.keys = {}
    }

    draw() {
        if (!env.debug) return

        const keys = Object.keys(this.keys)
        const N = keys.length
        if (N === 0) return

        const f = env.style.font.debug
        const H = N * f.size + (N + 1) * this.margin
        const X = rx(this.rx)
        const Y = ry(this.ry)
        const W = ctx.width * .5

        fill(this.background)
        rect(X, Y, W, H)

        baseTop()
        alignLeft()
        fill(this.color)
        font(f.size + 'px ' + f.family)

        let x = X + this.margin
        let y = Y + this.margin
        for (let i = 0; i < N; i++) {
            const k = keys[i]
            const v = this.keys[k]
            const icon = this.icons[k]
            if (icon) {
                image(icon, x, y, f.size, f.size)
                text(k + ': ' + v, x + f.size + this.margin, y)
            } else {
                text(k + ': ' + v, x, y)
            }
            y += (f.size + this.margin)
        }
    }
}
