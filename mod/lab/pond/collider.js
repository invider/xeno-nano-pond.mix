const _ghost = true

function evo(dt) {
    lab.pond.collide((src, trg) => {
        if (src._ghost || trg._ghost || src.dead || trg.dead) return
        if (src.touch) src.touch(trg)
    })
}
