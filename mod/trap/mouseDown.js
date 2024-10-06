function mouseDown(e) {
    log(`look at port::${e.pageX}:${e.pageY}`)
    lib.sfx('pop')
    lab.pond.setViewTarget(e.pageX, e.pageY)
}

