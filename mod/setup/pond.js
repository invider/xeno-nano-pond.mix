function pond() {
    // all cells will live in a pond
    lab.pond.touch('food')

    //lab.pond.w = 600
    //lab.pond.h = 600
    //lab.pond.smellMap.reset()

    for (let i = 0; i < 20; i++) {
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
}
pond.Z = 7
