const transient = true

function startNewGame() {
    this.killAll()
    this.__.resetGame()
    this.populate()
    env.gameStarted = true
    env.gameOver    = false
}

function populate() {
    for (let i = 0; i < 120; i++) {
        lab.pond.spawn( dna.pond.Cell, {
            x: rnd() * lab.pond.w,
            y: rnd() * lab.pond.h,
        })
    }

    for (let i = 0; i < 20; i++) {
        lab.pond.food.spawn( dna.pond.Food, {
            x: rnd() * lab.pond.w,
            y: rnd() * lab.pond.h,
        })
    }

    for (let i = 0; i < 5; i++) {
        lab.pond.waste.spawn( dna.pond.Waste, {
            x: rnd() * lab.pond.w,
            y: rnd() * lab.pond.h,
        })
    }
}

function killAll() {
    lab.pond.food.killAll()
    lab.pond.waste.killAll()
    lab.pond.apply(e => kill(e), e => !e.transient)
}

function onActivate() {
    lab.background = env.style.color.outside
}

function onDeactivate() {
    lab.background = env.style.color.background
}
