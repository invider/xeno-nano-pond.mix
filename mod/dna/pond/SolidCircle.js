class SolidCircle {

    constructor(st) {
        extend(this, {
            x: 0,
            y: 0,
            r: 1,
        }, st)
        this.r2 = this.r * this.r
    }

    gx() {
        return this.__.x + this.x
    }

    gy() {
        return this.__.y + this.y
    }

    collideWith(solid) {
        const d2 = math.distanceSq(
            this.gx(),  this.gy(),
            solid.gx(), solid.gy()
        )
        return (d2 <= this.r + solid.r)
    }

    draw() {
        lineWidth(1)
        stroke('#de5020')
        circle(this.x, this.y, this.r)
    }
}
