const _ghost = true

function evo(dt) {

    const ls = lab.pond._ls
    for (let i = 0; i < ls.length; i++) {
        const src = ls[i]
        if (src._ghost || src.dead || !src.hit) continue

        for (let j = 0; j < ls.length; j++) {
            if (i === j) continue
            const trg = ls[j]
            if (trg._ghost || trg.dead) continue

            if (trg._ls) {
                const ls2 = trg._ls
                for (let k = 0; k < ls2.length; k++) {
                    const subTarget = ls2[k]
                    if (subTarget._ghost || subTarget.dead) continue
                    if (src.collideWith(subTarget)) {
                        src.hit(subTarget)
                    }
                }
            } else {
                if (src.collideWith(trg)) {
                    src.hit(trg)
                }
            }
        }
    }
}
