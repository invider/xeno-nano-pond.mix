class SmellMap {

    constructor() {
        this._ghost = true
        this.reset()
    }

    reset() {
        this.granularity = 50;
        this.foodMap = []
        this.wasteMap = []
        this._initMap(this.foodMap)
        this._initMap(this.wasteMap)
        // this.threatMap = []
        // this._initMap(this.threatMap)
        this.smellFading = 0.3;
        this.smellRadius = 3;
        this.sceneW = lab.pond.w;
        this.sceneH = lab.pond.h;

        this.mapW = this.sceneW / this.granularity;
        this.mapH = this.sceneH / this.granularity;
    }

    fill() {
        this.foodMap = this._buildMap(lab.pond.food, this.foodMap);
        this.wasteMap = this._buildMap(lab.pond.waste, this.wasteMap);
    }

    evo(dt) {
        this.fill()
    }

    _buildMap(obj, map){
        map = this._initMap(map);
        for (var k in obj._ls){
            let foodObj = obj._ls[k];
            let [gridX, gridY] = this._toGrid(foodObj.x, foodObj.y);
            this._updateSmells(gridX, gridY, map);
        }
        return map
    }

    _updateSmells(x, y, map){
        this._forEachCellInRadius(map, x, y, this.smellRadius, (x, y, dist) => {
            if (dist === 0) {
                map[y][x] += 1;
            } else {
                map[y][x] += 1 / (dist / this.smellFading);
            }
        })
    }

    _forEachCellInRadius(map, cx, cy, radius, callback){
        let [x0, y0, x1, y1] = this._adaptRadiusCoords(cx, cy, radius);
        for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
                let dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
                if (dist <= radius) {
                    callback(x, y, dist);
                }
            }
        }
    }
    
    _adaptRadiusCoords(x, y, r){
        return [
            Math.max(x - r, 0),
            Math.max(y - r, 0),
            Math.min(x + r, this.mapW),
            Math.min(y + r, this.mapH)
        ]
    }

    getSmell(map, x, y){
        let [gridX, gridY] = this._toGrid(x, y);
        return this._getWithBounds(map, gridX, gridY)
    }
    // execute function for each elemen in map in radius
    
    smellAt(map, gx, gy) {
        if (gx < 0 || gx >= this.mapW || gy < 0 || gy >= this.mapH) return 0
        return this._getWithBounds(map, gx, gy)
    }

    _getWithBounds(map, x, y) {
        if (x < 0) x = 0
        if (x >= this.mapW) x = this.mapW - 1
        if (y < 0) y = 0
        if (y >= this.mapH) y = this.mapH - 1
        return map[y][x]
    }

    getSmellDir(map, x, y) {
        const [gx, gy] = this._toGrid(x, y)

        const smells = []
        smells.push( this.smellAt(map, gx - 1, gy - 1) )
        smells.push( this.smellAt(map, gx    , gy - 1) )
        smells.push( this.smellAt(map, gx + 1, gy - 1) )
        smells.push( this.smellAt(map, gx - 1, gy    ) )
        smells.push( this.smellAt(map, gx    , gy    ) )
        smells.push( this.smellAt(map, gx + 1, gy    ) )
        smells.push( this.smellAt(map, gx - 1, gy + 1) )
        smells.push( this.smellAt(map, gx    , gy + 1) )
        smells.push( this.smellAt(map, gx + 1, gy + 1) )

        let max = 0, index = 4
        for (let i = 0; i < smells.length; i++) {
            if (smells[i] > max) {
                max = smells[i]
                index = i
            }
        }

        let dgx = 0, dgy = 0
        switch(index) {
            case 0: dgx = -1; dgy = -1; break
            case 1: dgx =  0; dgy = -1; break
            case 2: dgx =  1; dgy = -1; break
            case 3: dgx = -1; dgy =  0; break
            case 4: dgx =  0; dgy =  0; break
            case 5: dgx =  1; dgy =  0; break
            case 6: dgx = -1; dgy =  1; break
            case 7: dgx =  0; dgy =  1; break
            case 8: dgx =  1; dgy =  1; break
        }

        return {
            dx: dgx,
            dy: dgy,
        }
    }


    _initMap(map){
        map = map || [];
        if (map.length){
            for (let y = 0; y < this.mapH; y++) {
                for (let x = 0; x < this.mapW; x++) {
                    map[y][x] = 0;
                }
            }
            return map;
        }

        for (let y = 0; y < this.mapH; y++) {
            let row = [];
            for (let x = 0; x < this.mapW; x++) {
                row.push(0);
            }
            map.push(row);
        }
        return map;
    }

    _toGrid(x, y) {
        return [
            Math.floor(x / this.granularity),
            Math.floor(y / this.granularity)
        ]
    }

    draw() {
        if (!env.debug || !env.flag.showMaps) return

        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                const G = this.granularity
                const foodVal = this.foodMap[y][x]
                const wasteVal = this.wasteMap[y][x]
                //if (foodVal === 0 && wasteVal === 0) continue;
                if (foodVal > wasteVal){
                    this.drawSmell(x, y, foodVal, "#FF0000");
                } else {
                    this.drawSmell(x, y, wasteVal, "#00FF00");
                }
            }
        }
    }
    drawSmell(x, y, smellValue, baseColor) {
        if (smellValue === 0) return
        const G = this.granularity
        const ismell = clamp(Math.floor(smellValue * 100), 0, 100)
        const intensity = ismell.toString(16).padStart(2, '0')
        fill(baseColor + intensity)
        rect(x * G, y * G, G, G)

        if (env.flag.showSmellValue) {
            baseMiddle()
            alignCenter()
            fill('#000000')
            font(env.style.font.dump.head)
            text('' + round(smellValue * 100)/100, x * G + .5*G, y * G + .5*G)
        }
    }
}

const smellMap = new SmellMap();
