let _id = 0
const foodTypes = {
    'orangy': {
        imgs: [res.cell.orangyLeftWaste]
    },
    'jelly': {
        imgs: [res.cell.jellyLeftWaste]
    },
}
class Waste {

    constructor(st) {

        this.name = 'waste' + (++_id)
        let descriptor = math.rnde(foodTypes)
        if (st.cellType && foodTypes[st.cellType]) {
            descriptor = foodTypes[st.cellType]
        }
        extend(this, {
            hp: 100,
            heal: -100,
            x: 0,
            y: 0,
            lifespan: 30,
            r: 10,
            dr: 0.1,
            a: math.rndfi(),
            dx:5 * math.rnds(),
            dy:5 * math.rnds(),
            descriptor: descriptor
        }, st)
        this.hp = this.descriptor.hp || 100;
        this.heal = this.descriptor.heal || 100;
        this.img = this.descriptor.imgs[0];
        this.aspectRate = this.img.width / this.img.height
        this.w = this.r * 2
        this.h = this.w / this.aspectRate

        this.solids = [
            new dna.pond.SolidCircle({
                __: this,
                x: 0,
                y: 0,
                r: this.r,
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
        else if (this.x > lab.pond.w-R && this.dx > 0) this.dx *= -1
        else if (this.y > lab.pond.h-R && this.dy > 0) this.dy *= -1
        else if (this.x > ctx.width-R && this.dx > 0) this.dx *= -1
        if (this.y < R && this.dy < 0) this.dy *= -1
        else if (this.y > ctx.height-R && this.dy > 0) this.dy *= -1
        this.lifespan -= dt
        if (this.lifespan <= 0) kill(this)
    }

    draw() {
        save()
        translate(this.x, this.y)

        save()
        rotate(this.a);
        // image(this.descriptor.img, - this.w / 2, - this.h / 2, this.w, this.h);
        //lineWidth(2)
        //stroke('#f59e42')
        //circle(0, 0, this.r)
        image(this.img, - this.w / 2, - this.h / 2, this.w, this.h);

        // === debug info ===
        restore() // back from rotation
        if (env.debug && env.flag.showSolids) {
            this.solids.forEach(solid => solid.draw())
        }
        if (env.debug && env.flag.showName) {
            baseBottom()
            alignCenter()
            fill('#ffffff')
            font(env.style.font.dump.head)
            text(this.name, 0, -this.r)
        }

        restore();
    }

    getStatus() {
        return this.name
    }
}
