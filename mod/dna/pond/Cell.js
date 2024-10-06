class Cell {

    constructor(st) {
        let cellTypes = {
            'froggy': {
                img: res.cell.froggy,
                w: 512,
                h: 276,
                centers: [
                    {
                        x: 50,
                        y: 50,
                        r: 25
                    }
                ]
            },
            'jelly': {
                img: res.cell.jelly,
                w: 512,
                h: 412,
                centers: [
                    {
                        x: 50,
                        y: 50,
                        r: 25
                    }
                ]
            },
            'orange': {
                img: res.cell.orangy,
                w: 512,
                h: 276,
                centers: [
                    {
                        x: 50,
                        y: 50,
                        r: 25
                    }
                ]
            },
            'swampy': {
                img: res.cell.swampy,
                w: 512,
                h: 275,
                centers: [
                    {
                        x: 50,
                        y: 50,
                        r: 25
                    }
                ]
            },
            'brownie': {
                img: res.cell.brownie,
                w: 512,
                h: 494,
                centers: [
                    {
                        x: 50,
                        y: 50,
                        r: 25
                    }
                ]
            }
        }
        
        extend(this, {
            x: 0,
            y: 0,
            r: 20,
            receptorCooldown: 0.5,
            rcCd: Math.random() * 3,
            a: 0,
            da: (Math.random() * 0.4) * math.rnds(),
            dx: 10,
            dy: 10,
            descriptor: math.rnde(cellTypes)
        }, st)
        this.aspectRate = this.descriptor.w / this.descriptor.h
        this.w = this.r * 2
        this.h = this.w / this.aspectRate
        console.log("descriptor", this.descriptor);
    }

    init() {
        this.x = rx(1) * rnd()
        this.y = ry(1) * rnd()
        this.dx = math.rnds() * (20 + 20 * rnd())
        this.dy = math.rnds() * (20 + 20 * rnd())
        this.targetDx = this.dx
        this.targetDy = this.dy
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
        else if (this.x > ctx.width-R && this.dx > 0) 
        {
            this.dx *= -1
            this.targetDx *= -1
        }
        if (this.y < R && this.dy < 0) {
            this.dy *= -1
            this.targetDy *= -1
        }
        else if (this.y > ctx.height-R && this.dy > 0) {
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
        restore();
    }
}
