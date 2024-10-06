/*
 * Debug information node.
 *
 * Set env.debug = true to enable
 */

const df = {
    name:       'debugInfo',
    color:      hsl(.14, .4, .5),
    background: '#00000070',
    margin:     8,
    rx:         0,
    ry:         0,
}

class DebugInfo {

    constructor(st) {
        extend(this, df, st)
        this.keys = {}
    }

    set(key, msg) {
        this.keys[key] = msg
        if (!msg) delete this.keys[key]
    }

    setAll(st) {
        if (!st) return

        const keys = this.keys
        Object.keys(st).forEach(k => {
            keys[k] = st[k]
        })
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
            text(k + ': ' + v, x, y)
            y += (f.size + this.margin)
        }
    }
}
