function pond() {
    // all cells will live in a pond
    lab.pond.touch('food')

    for (let i = 0; i < 128; i++) {
        lab.pond.spawn( dna.pond.Cell )
    }

    for (let i = 0; i < 50; i++) {
        lab.pond.food.spawn( dna.pond.Food )
    }
}
pond.Z = 7
