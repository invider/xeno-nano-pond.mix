function screen() {
    extend(lab.pond, dna.trait.screenTrait)
    lab.screen._ls.forEach(screen => {
        extend(screen, dna.trait.screenTrait)
    })
}
screen.Z = 11

