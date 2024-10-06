function mouseDown(e) {
    if (env.screen === 'pond') {
        const sx = e.pageX,
              sy = e.pageY
        log(`look at port::${sx}:${sy}`)
        lib.sfx('pick')
        lab.pond.setViewTarget(e.pageX, e.pageY)

        const gx = lab.pond.lx(sx),
              gy = lab.pond.ly(sy)
        const smellDir = lab.pond.smellMap.getSmellDir(lab.pond.smellMap.foodMap, gx, gy)
        if (smellDir) {
            log(`smell dir: [${smellDir.dx}:${smellDir.dy}]`)
        }

        const picked = []
        const node = lab.pond.pick(sx, sy, picked)
        picked.forEach(node => {
            console.dir(node)
        })
    }
}

