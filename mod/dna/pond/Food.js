let _id = 0
class Food {

    constructor(st) {
        this.name = 'food' + (++_id)
        extend(this, {
            x: 0,
            y: 0,
            r: 3,
            a: 0,
            dx:0,
            dy:0,
        }, st)

        this.solids = [
            new dna.pond.SolidCircle({
                __: this,
                x: 0,
                y: 0,
                r: 3,
            })
        ]
    }

    init() {
        //this.x = rx(1) * rnd()
        //this.y = ry(1) * rnd()
        // this.dx = math.rnds() * (20 + 20 * rnd())
        // this.dy = math.rnds() * (20 + 20 * rnd())
    }

    evo(dt) {
        this.a += this.da * dt
        const R = this.r
        this.x += this.dx * dt
        this.y += this.dy * dt
        if (this.x < R && this.dx < 0) this.dx *= -1
        else if (this.x > ctx.width-R && this.dx > 0) this.dx *= -1
        if (this.y < R && this.dy < 0) this.dy *= -1
        else if (this.y > ctx.height-R && this.dy > 0) this.dy *= -1
        
    }

    draw() {
        save();
        translate(this.x, this.y);
        rotate(this.a);
        // image(this.descriptor.img, - this.w / 2, - this.h / 2, this.w, this.h);
        lineWidth(2)
        stroke('#f59e42')
        circle(0, 0, this.r)

        // show solids
        this.solids.forEach(solid => solid.draw())

        restore();
    }
}
