class StatusBar {

    constructor(st) {
        extend(this, {
            tag:   '',
            color: hsl(.14, .6, .5),
            background: '#000000A0',
            gap:   4,
        }, st)
    }

    set(tag) {
        this.tag = tag
        if (this.tag) {
            this.lines = this.tag.split('\n')
        } else {
            this.lines = []
        }
    }

    draw() {
        if (!env.debug || !this.tag) return
        let y = ry(1)


        const f = env.style.font.debug
        const step = f.size + this.gap
        const H = step * this.lines.length + this.gap

        fill(this.background)
        rect(0, ctx.height - H, ctx.width, H)

        alignLeft()
        baseBottom()
        fill(this.color)
        font(f.size + 'px ' + f.family)
        for (let i = this.lines.length - 1; i >= 0; i--) {
            const line = this.lines[i]
            text(line, 0, y)
            y -= step
        }
    }
}
