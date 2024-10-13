const _ghost = true

const objects = [];
const hittable = [];
const kd = [];
const num_regions = 20;
// physics engine time gap
const _min_time_gap = 0.003;

let _since_last_refresh = 0;
function registerObject(collidable){

    if (!collidable.name) {
        console.error(`[collider] object ${collidable.name} has no 'name'!`)
        return
    }
    if (collidable.dead) {
        console.error(`[collider] object ${collidable.name} is already dead!`)
        return
    }

    if (collidable.hit) {
        hittable.push(collidable)
    }
    objects.push(collidable)
    // fun optimisation of type conversion
    //trg._ghost || trg.dead || !trg.solids
    collidable.dead = collidable.dead || false;
    collidable._ghost = collidable._ghost || false;
}

function unregisterObject(collidable){
    //console.log("unregistering", collidable.name)
    let index = objects.indexOf(collidable)
    if (index !== -1) objects.splice(index, 1)
    index = hittable.indexOf(collidable)
    if (index !== -1) hittable.splice(index, 1)
}
        
function _shouldRemove(obj){
    return obj._ghost || obj.dead;
}


function findMaxSizes(){
    let maxW = 0
    let maxH = 0
    for (let i = 0; i < objects.length; i++) {
        let src = objects[i]
        if (_shouldRemove(src)) continue
        if (src.w > maxW) maxW = src.w
        if (src.h > maxH) maxH = src.h
    }
    return {w: maxW, h: maxH}
}


function regionCoordinatesFromCoordinates(x, y) {
    let xx = Math.floor(x / (ctx.width / num_regions))
    let yy = Math.floor(y / (ctx.height / num_regions))
    xx = Math.max(0, Math.min(num_regions - 1, xx))
    yy = Math.max(0, Math.min(num_regions - 1, yy))

    return [
        xx, yy
    ]
}

function putToRegion(obj, rx, ry) {
    while (ry > kd.length - 1) {
        kd.push([])
    }

    while (rx > kd[ry].length - 1) {
        kd[ry].push([])
    }

    kd[ry][rx].push(obj)
}

function clearRegions() {
    for (let i = 0; i < kd.length; i++) {
        for (let j = 0; j < kd[i].length; j++) {
            kd[i][j] = []
        }
    }
}
function fillRegionsInRange(x, y, w, h, obj) {
    let [lUX, lUY] = regionCoordinatesFromCoordinates(x, y)
    let [rUX, rUY] = regionCoordinatesFromCoordinates(x + w, y)
    let [lDX, lDY] = regionCoordinatesFromCoordinates(x, y + h)
    let [rDX, rDY] = regionCoordinatesFromCoordinates(x + w, y + h)
    for (let rx = lUX; rx <= rUX; rx++) {
        for (let ry = lUY; ry <= rUY; ry++) {
            putToRegion(obj, rx, ry);
        }
    }
}
function buildKd(){
    clearRegions()
    let del = false;
    //let {w, h} = findMaxSizes()
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i]
        if (_shouldRemove(obj)) {
            del = true
            continue
        }
        fillRegionsInRange(obj.x, obj.y, obj.w, obj.h, obj)
    }
    return del
}

function evo(dt) {
    _since_last_refresh += dt;

    if (_since_last_refresh < _min_time_gap) {
        return
    }
    _since_last_refresh = 0;
    
    if (_doCollide(dt)) {
        collect();
    }   
}

function _doCollide(dt){
    let del = buildKd();
    for (let i = 0; i < kd.length; i++) {
        for (let j = 0; j < kd[i].length; j++) {
            collideRegion(kd[i][j])
        }
    }
    return del;
}

function collideRegion(region){
    for (let i = 0; i < region.length - 1; i++) {
        const src = region[i]
        for (let j = 0; j < region.length; j++) {
            if (i === j) continue
            const trg = region[j]
            if (!lib.colliderUtil.shouldCollideFast(src, trg)) continue
            if (trg.collideWith && trg.collideWith(src)) {
                trg.hit(src)
            }
        }
    }
}


function collect(){
    let i = 0;
    while (i < objects.length){
        while (i < objects.length && _shouldRemove(objects[i])){
            unregisterObject(objects[i]);
        }
        i ++;    
    }
}

// for (let i = 0; i < objects.length; i++) {
//     let src = objects[i]
//     if (_shouldRemove(src)) {
//         del = true
//         continue;
//     }
//     for (let j = 0; j < hittable.length; j++) {
//         if (src === hittable[j]) continue
//         if (_shouldRemove(hittable[j])) continue
        
//         let trg = hittable[j]
//         if (!lib.colliderUtil.shouldCollideFast(src, trg)) continue
//         if (trg.collideWith(src)) {
//             trg.hit(src)
//         }
//     }
// }