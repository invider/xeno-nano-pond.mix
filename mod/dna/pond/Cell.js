const cellTypes = {
    'froggy': {
        img: res.cell.froggy,
        lifespan: 10,
        baseHp: 200,
        team: 1,
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
        team: 2,
        baseHp: 60,
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
        baseHp: 80,
        cellType: 'orange',
        team: 3,
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
        baseHp: 150,
        cellType: 'swampy',
        team: 4,
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
        baseHp: 100,
        team: 5,
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
function getMaxHp() {
    let maxHp = 0;
    for (let k in cellTypes) {
        maxHp = Math.max(cellTypes[k].baseHp, maxHp);
    }
    return maxHp
}
const maxHp = getMaxHp();

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
            hp: 0,
            vrs: 0.5,
            receptorCooldown: 0.5,
            rcCd: Math.random() * 3,
            a: 0,
            da: (Math.random() * 0.4) * math.rnds(),
            dx: 10,
            dy: 10,
            damage: 30,
            descriptor: math.rnde(cellTypes)
        }, st)
        this.team = this.descriptor.team
        this.descriptor.lifespan = this.descriptor.lifespan || 20
        this.hp = this.descriptor.baseHp || 100
        this.lifespan = this.descriptor.lifespan;
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
        const threshold = trg.w + this.w;
        if (!trg.solids) return
        if (Math.abs(trg.x - this.x) > threshold || Math.abs(trg.y - this.y) > threshold) return
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
        } else if (trg instanceof dna.pond.Cell) {
            if (this.team !== trg.team) {
                //console.log("Enemy detected: ", trg)
                this.hp -= Math.min(trg.damage, trg.hp);
            } 

            this.dx = this.x - trg.x
            this.dy = this.y - trg.y
        
            if (Math.abs(this.x - trg.x) <= 1 && Math.abs(this.y - trg.y) <= 1) {
                this.x = trg.x - (1 + 3 * math.rnd()) * math.rnds();
                this.y = trg.y - (1 + 3 * math.rnd()) * math.rnds();
            }
        }
    }

    eat(food) {
        this.hp += food.hp
        //log(`[${this.name}]: eating food [${food.name}/${food.hp}] HP^: ${this.hp}`)
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

        this.dx += this._normalizeD(dxDiff * this.vrs * dt);
        this.dy += this._normalizeD(dyDiff * this.vrs * dt);
        
        this.lifespan -= dt
        if (this.lifespan <= 0) {
            kill(this)
            this._spawnFood();
        }
        // this.hp += 1 * dt;
        if (this.hp > this.descriptor.baseHp * this.hpThreshold) {
            this.mitosis()
        }
        if (this.hp <= 0) {
            kill(this)
            this._spawnFood();
        }
    }

    _spawnFood() {
        lab.pond.food.spawn( dna.pond.Food, {x: this.x, y: this.y, cellType: this.descriptor.cellType})
    }

    _normalizeD(d){
        if (Math.abs(d) < 0.01) {
            if (d == 0){
                return 0.01;
            }
            return 0.01 * d / -d
        }
        return d;
    }

    mitosis() {
        lab.pond.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dx + 1, dy: this.dy + 1, descriptor: this.descriptor, a: this.a})
        lab.pond.spawn( dna.pond.Cell, {x: this.x, y: this.y, dx: this.dx - 1, dy: this.dy - 1, descriptor: this.descriptor, a: this.a})
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
            var lifespanWidth = this.w * this.hp / maxHp
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
