function mouseDown(e) {
    env.touched = true
    if (env.screen === 'pond') {
        const sx = e.pageX,
              sy = e.pageY
        const gx = lab.pond.lx(sx),
              gy = lab.pond.ly(sy)
        log(`at port::${lib.util.normXY(sx, sy)} -> pond::${lib.util.normXY(gx, gy)}`)

        // pick objects
        const picked = []
        const node = lab.pond.pick(sx, sy, picked)
        picked.forEach(node => {
            console.dir(node)
        })
              
        // spawn food
        if (!(gx < 0 || gx >= lab.pond.w || gy < 0 || gy >= lab.pond.h)) {
            switch(e.button) {
                case 0:
                    lab.pond.food.spawn( dna.pond.Food, {x: gx, y: gy})
                    lib.sfx('pick')
                    break
                case 2:
                    lab.pond.food.spawn( dna.pond.Waste, {x: gx, y: gy})
                    lib.sfx('pick')
                    break
            }
        }
    }
}
