class SolidCircle {

    constructor(st) {
        extend(this, {
            x: 0,
            y: 0,
            r: 1,
        }, st)
        this.r2 = this.r * this.r
    }

    collide(solid) {
        const d2 = math.distanceSq(
            this.__.x + this.x, this.__.y + this.y,
            solid.__.x + solid.x, solid.__.y + solid.y)
        return (d2 <= this.r + solid.r)
    }
}
