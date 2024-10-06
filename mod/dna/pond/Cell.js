const cellTypes = {
    'froggy': {
        img: res.cell.froggy,
        lifespan: 10,
        cellType: 'froggy',
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
        lifespan: 40,
        cellType: 'jelly',
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
        lifespan: 20,
        cellType: 'orange',
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
        lifespan: 15,
        cellType: 'swampy',
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
        lifespan: 30,
        cellType: 'brownie',
        centers: [
            {
                x: 0,
                y: 0,
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
        this.aspectRate = this.descriptor.img.width / this.descriptor.img.height
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
        if (trg instanceof dna.pond.Food) {
            this.eat(trg)
        }
    }

    eat(food) {
        this.hp += food.hp
        log(`[${this.name}]: eating food [${food.name}/${food.hp}] HP^: ${this.hp}`)
        //log(lib.util.normXY(this.x, this.y) + ' <=> ' + lib.util.normXY(food.x, food.y))
        kill(food)
        lib.sfx('eat')
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
            //let smell = lab.pond.smellMap.getSmell(lab.pond.smellMap.foodMap, this.x, this.y);
            let {dx, dy} = lab.pond.smellMap.getSmellDir(lab.pond.smellMap.foodMap, this.x, this.y);
            if (dx != 0 || dy != 0) {
                this.targetDx = dx * (20 + 20 * rnd())
                this.targetDy = dy * (20 + 20 * rnd())    
            }
            if (this.targetDx == 0 && this.targetDy == 0) {
                this.targetDx = math.rnds() * (20 + 20 * rnd())
                this.targetDy = math.rnds() * (20 + 20 * rnd())
            }
        }

        var dxDiff = this.targetDx - this.dx;
        var dyDiff = this.targetDy - this.dy;

        this.dx += dxDiff * 0.1 * dt;
        this.dy += dyDiff * 0.1 * dt;
        
        this.lifespan -= dt
        if (this.lifespan <= 0) {
            kill(this)
            lab.pond.food.spawn( dna.pond.Food, {x: this.x, y: this.y, cellType: this.descriptor.cellType})
        }
        // this.hp += 1 * dt;
        if (this.hp > this.baseHp * this.hpThreshold) {
            this.mitosis()
        }
    }

    mitosis() {
        log(`[${this.name}]: mitosis!!`)
        lab.pond.food.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dx + 1, dy: this.dy + 1, descriptor: this.descriptor, a: this.a})
        lab.pond.food.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dx - 1, dy: this.dy - 1, descriptor: this.descriptor, a: this.a})
        kill(this)
    }

    onKill() {
        //lab.pond.food.spawn( dna.pond.Food)
    }

    draw() {
        save();
        translate(this.x, this.y);

        save()
        rotate(this.a);
        image(this.descriptor.img, - this.w / 2, - this.h / 2, this.w, this.h);

        // === debug circles ===
        if (env.debug && env.flag.showRadius) {
            let foodSmell = lab.pond.smellMap.getSmell(lab.pond.smellMap.foodMap, this.x, this.y)
            if (foodSmell > 1){
                foodSmell = 1
            } 

            let color = Math.floor(foodSmell * 255)
            lineWidth(2)
            stroke('#' + color.toString(16).padStart(2, '0') + '1111')
            //stroke('#40A0CE')
            circle(0, 0, this.r)
        }
        if (env.debug && env.flag.showSolids) this.solids.forEach(solid => solid.draw())

        restore(); // back from rotation
        
        // === debug bars ===
        if (env.debug && env.flag.showBars) {
            let halfW = this.w / 2
            let halfH = this.h / 2
            // hp bar
            lineWidth(2)
            stroke('#ff0000')
            var lifespanWidth = this.w * this.hp / this.baseHp
            line(- halfW, - halfH, - halfW + lifespanWidth, - halfH)

            // hp bar
            lineWidth(2)
            stroke('#00ff00')
            var lifespanWidth = this.w * this.lifespan / this.descriptor.lifespan
            line(- halfW, - halfH + 3, - halfW + lifespanWidth, - halfH + 3)
            
            // target bar
            lineWidth(2)
            stroke('#ffff00')
            line(0, 0, this.targetDx, this.targetDy)

            // direction bar
            lineWidth(2)
            stroke('#ff00ff')
            line(0, 0, this.dx, this.dy)
        }

        if (env.debug && env.flag.showName) {
            baseBottom()
            alignCenter()
            fill('#ffffff')
            font('12px pixel-operator-8')
            text(this.name, 0, -this.r)
        }

        restore();
    }
}
