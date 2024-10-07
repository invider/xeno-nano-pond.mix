function pond() {
    // all cells will live in a pond
    lab.pond.touch('food')
    lab.pond.touch('waste')

    //lab.pond.w = 600
    //lab.pond.h = 600
    //lab.pond.smellMap.reset()

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
    // lab.pond.spawn( dna.pond.Cell, {
    //     x: 100,
    //     y: 100,
    //     dx: 10,
    //     dy:0
    // })

    // lab.pond.food.spawn( dna.pond.Food, {
    //     x: 170,
    //     y: 130,
    // })
}
pond.Z = 7
