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
    }

    evo(dt) {
        this.x += this.dx
        this.y += this.dy
        if (this.x < 0 && this.dx < 0) this.dx *= -1
        else if (this.x > ctx.width && this.dx > 0) this.dx *= -1
        if (this.y < 0 && this.dy < 0) this.dy *= -1
        else if (this.y > ctx.height && this.dy > 0) this.dy *= -1
    }

    draw() {
        lineWidth(2)
        stroke('#40A0CE')
        circle(this.x, this.y, this.r)
    }
}
