function pond() {
    // all cells will live in a pond
    lab.pond.touch('food')

    env.pW = lab.pond.w
    env.pH = lab.pond.h
    for (let i = 0; i < 128; i++) {
        lab.pond.spawn( dna.pond.Cell, {
            x: rnd() * env.pW,
            y: rnd() * env.pH,
        })
    }

    for (let i = 0; i < 50; i++) {
        lab.pond.food.spawn( dna.pond.Food, {
            x: rnd() * env.pW,
            y: rnd() * env.pH,
        })
    }
}
pond.Z = 7
