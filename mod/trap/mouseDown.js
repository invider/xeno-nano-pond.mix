function mouseDown(e) {
    if (env.screen === 'pond') {
        log(`look at port::${e.pageX}:${e.pageY}`)
        lib.sfx('pop')
        lab.pond.setViewTarget(e.pageX, e.pageY)

        const lx = lab.pond.lx(e.pageX),
              ly = lab.pond.ly(e.pageY)
        const smellDir = lab.pond.smellMap.getSmellDir(lab.pond.smellMap.foodMap, lx, ly)
        if (smellDir) {
            log(`smell dir: [${smellDir.dx}:${smellDir.dy}]`)
        }
    }
}

