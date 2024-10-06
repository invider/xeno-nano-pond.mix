class Cell {

    constructor(st) {
        extend(this, {
            x: 0,
            y: 0,
            r: 20,

            dx: 10,
            dy: 10,
        }, st)
    }

    init() {
        this.x = rx(1) * rnd()
        this.y = ry(1) * rnd()
        this.dx = math.rnds() * (20 + 20 * rnd())
        this.dy = math.rnds() * (20 + 20 * rnd())
    }

    evo(dt) {
        const R = this.r
        this.x += this.dx * dt
        this.y += this.dy * dt
        if (this.x < R && this.dx < 0) this.dx *= -1
        else if (this.x > ctx.width-R && this.dx > 0) this.dx *= -1
        if (this.y < R && this.dy < 0) this.dy *= -1
        else if (this.y > ctx.height-R && this.dy > 0) this.dy *= -1
    }

    draw() {
        lineWidth(2)
        stroke('#40A0CE')
        circle(this.x, this.y, this.r)
    }
}
