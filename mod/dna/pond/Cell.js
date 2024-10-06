const cellTypes = {
    'froggy': {
        img: res.cell.froggy,
        w: 512,
        h: 276,
        lifespan: 10,
        centers: [
            {
                x: 0,
                y: 0,
                r: 25
            }
        ]
    },
    'jelly': {
        img: res.cell.jelly,
        w: 512,
        h: 412,
        lifespan: 40,
        centers: [
            {
                x: 0,
                y: 0,
                r: 25
            }
        ]
    },
    'orange': {
        img: res.cell.orangy,
        w: 512,
        h: 276,
        lifespan: 20,
        centers: [
            {
                x: 0,
                y: 0,
                r: 25
            }
        ]
    },
    'swampy': {
        img: res.cell.swampy,
        w: 512,
        h: 275,
        lifespan: 15,
        centers: [
            {
                x: 0,
                y: 0,
                r: 25
            }
        ]
    },
    'brownie': {
        img: res.cell.brownie,
        w: 512,
        h: 494,
        lifespan: 30,
        centers: [
            {
                x: 50,
                y: 50,
                r: 25
            }
        ]
    }
}

let _id = 0
class Cell {

    constructor(st) {
        this.name = 'cell' + (++_id)
        this.dx = math.rnds() * (20 + 20 * rnd())
        this.dy = math.rnds() * (20 + 20 * rnd())
        this.targetDx = this.dx
        this.targetDy = this.dy
        
        extend(this, {
            x: 0,
            y: 0,
            r: 20,
            hp: 100,
            receptorCooldown: 0.5,
            rcCd: Math.random() * 3,
            a: 0,
            da: (Math.random() * 0.4) * math.rnds(),
            dx: 10,
            dy: 10,
            descriptor: math.rnde(cellTypes)
        }, st)
        this.descriptor.lifespan = this.descriptor.lifespan || 20
        this.lifespan = this.descriptor.lifespan;
        this.baseHp = this.baseHp || this.hp;
        this.hpThreshold = 1.2;
        this.aspectRate = this.descriptor.w / this.descriptor.h
        this.w = this.r * 2
        this.h = this.w / this.aspectRate

        const cell = this
        const solids = this.solids = []
        this.descriptor.centers.forEach(center => {
            const solid = new dna.pond.SolidCircle(center)
            solid.__ = cell
            solids.push(solid)
        })
    }

    init() {}

    collideWith(trg) {
        if (!trg.solids) return
        for (let i = 0; i < this.solids.length; i++) {
            const mySolid = this.solids[i]
            for (let j = 0; j < trg.solids.length; j++) {
                const trgSolid = trg.solids[j]
                if (mySolid.collideWith(trgSolid)) return true
            }
        }
        return false
    }

    hit(trg) {
        log(`hit [${this.name}] <=> [${trg.name}]`)
    }

    evo(dt) {
        this.a += this.da * dt
        const R = this.r
        this.x += this.dx * dt
        this.y += this.dy * dt
        if (this.x < R && this.dx < 0) {
            this.dx *= -1
            this.targetDx *= -1
        }
        else if (this.x > lab.pond.w-R && this.dx > 0) 
        {
            this.dx *= -1
            this.targetDx *= -1
        }
        if (this.y < R && this.dy < 0) {
            this.dy *= -1
            this.targetDy *= -1
        }
        else if (this.y > lab.pond.h-R && this.dy > 0) {
            this.dy *= -1
            this.targetDy *= -1
        }
        this.rcCd -= dt;
        if (this.rcCd <= 0) {
            this.rcCd = this.receptorCooldown;
            let {dx, dy} = lab.pond.smellMap.getSmellDir(lab.pond.smellMap.foodMap, this.x, this.y);
            this.targetDx = dx * (20 + 20 * rnd())
            this.targetDy = dy * (20 + 20 * rnd())
        }

        var dxDiff = this.targetDx - this.dx;
        var dyDiff = this.targetDy - this.dy;

        this.dx += dxDiff * 0.1 * dt;
        this.dy += dyDiff * 0.1 * dt;
        
        this.lifespan -= dt
        if (this.lifespan <= 0) {
            kill(this)
            lab.pond.food.spawn( dna.pond.Food, {x: this.x, y: this.y})
        }
        // this.hp += 1 * dt;
        if (this.hp > this.baseHp * this.hpThreshold) {
            this.mitosis()
        }
    }

    mitosis() {
        lab.pond.food.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dy, dy: this.dx, descriptor: this.descriptor, a: this.a + Math.PI})
        lab.pond.food.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dy, dy: this.dx, descriptor: this.descriptor, a: this.a - Math.PI})
        kill(this)
    }

    onKill() {
        //lab.pond.food.spawn( dna.pond.Food)
    }

    draw() {
        save();
        translate(this.x, this.y);
        rotate(this.a);
        image(this.descriptor.img, - this.w / 2, - this.h / 2, this.w, this.h);
        lineWidth(2)
        let foodSmell = lab.pond.smellMap.getSmell(lab.pond.smellMap.foodMap, this.x, this.y)
        if (foodSmell > 1){
            foodSmell = 1
        } 
        let color = Math.floor(foodSmell * 255)
        stroke('#' + color.toString(16).padStart(2, '0') + '1111')
        //stroke('#40A0CE')
        circle(0, 0, this.r)

        // show solids
        this.solids.forEach(solid => solid.draw())

        restore();
    }
}
