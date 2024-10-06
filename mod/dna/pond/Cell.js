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
            }
        }
        
        extend(this, {
            x: 0,
            y: 0,
            r: 20,
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
