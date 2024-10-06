function pond() {
    // all cells will live in a pond
    lab.touch('pond')

    for (let i = 0; i < 128; i++) {
        lab.pond.spawn( dna.pond.Cell )
    }
}
pond.Z = 7
