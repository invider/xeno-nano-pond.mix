class SmellMap {
    constructor() {
        this.granularity = 50;
        this.foodMap = []
        this.threatMap = []
        this.smellFading = 0.3;
        this.smellRadius = 3;
        this.sceneW = ctx.width;
        this.sceneH = ctx.height;

        this.mapW = this.sceneW / this.granularity;
        this.mapH = this.sceneH / this.granularity;
    }

    evo(dt) {
        this.foodMap = this._buildMap(lab.pond.food, this.foodMap);
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
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                let dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
                if (dist <= radius) {
                    callback(x, y, dist);
                }
            }
        }
    }

    getSmell(map, x, y){
        let [gridX, gridY] = this._toGrid(x, y);
        return map[gridY][gridX];
    }
    // execute function for each elemen in map in radius


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
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                const G = this.granularity
                const foodVal = this.foodMap[y][x]
                const color = limit(Math.floor(foodVal * 255), 0, 255)
                const R = color.toString(16).padStart(2, '0')
                fill(`#${R}2020`)
                rect(x * G, y * G, G, G)

                baseMiddle()
                alignCenter()
                fill('#ffffff')
                font('20px pixel-operator-8')
                text('' + round(foodVal * 100)/100, x * G + .5*G, y * G + .5*G)
            }
        }
    }
}

const smellMap = new SmellMap();
