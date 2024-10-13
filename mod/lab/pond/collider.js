const _ghost = true

const objects = [];
const hittable = [];
// physics engine time gap
const _min_time_gap = 0.03;

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

function evo(dt) {
    _since_last_refresh += dt;

    if (_since_last_refresh < _min_time_gap) {
        return
    }
    _since_last_refresh = 0;
    let del = false;
    for (let i = 0; i < objects.length; i++) {
        let src = objects[i]
        if (_shouldRemove(src)) {
            del = true
            continue;
        }
        for (let j = 0; j < hittable.length; j++) {
            if (src === hittable[j]) continue
            if (_shouldRemove(hittable[j])) continue
            
            let trg = hittable[j]
            if (!lib.colliderUtil.shouldCollideFast(src, trg)) continue
            if (trg.collideWith(src)) {
                trg.hit(src)
            }
        }
    }
    if (del){
        collect();
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
    // function evo(dt) {
    
    //     const ls = lab.pond._ls
    //     for (let i = 0; i < ls.length; i++) {
    //         const src = ls[i]
    //         if (src._ghost || src.dead || !src.hit) continue
    
    //         for (let j = 0; j < ls.length; j++) {
    //             if (i === j) continue
    //             const trg = ls[j]
    //             if (trg._ghost || trg.dead) continue
    //             if (trg._ls) {
    //                 const ls2 = trg._ls
    //                 for (let k = 0; k < ls2.length; k++) {
    //                     const subTarget = ls2[k]
    //                     if (!lib.colliderUtil.shouldCollide(src, subTarget)) continue
    //                     if (src.collideWith(subTarget)) {
    //                         src.hit(subTarget)
    //                     }
    //                 }
    //             } else {
    //                 if (!lib.colliderUtil.shouldCollide(src, trg)) continue
    //                 if (src.collideWith(trg)) {
    //                     src.hit(trg)
    //                 }
    //             }
    //         }
    //     }
    // }