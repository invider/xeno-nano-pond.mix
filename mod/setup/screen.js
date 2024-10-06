function screen() {
    supplement(lab.pond, dna.trait.screenTrait)
    lab.screen._ls.forEach(screen => {
        supplement(screen, dna.trait.screenTrait)
    })
}
screen.Z = 11

