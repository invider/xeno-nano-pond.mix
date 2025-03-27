function pond() {
    // all cells will live in a pond
    lab.pond.touch('food')
    lab.pond.food.transient = true
    lab.pond.touch('waste')
    lab.pond.waste.transient = true

    //lab.pond.w = 600
    //lab.pond.h = 600
    //lab.pond.smellMap.reset()

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
