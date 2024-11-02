function screen() {
    extend(lab.pond, dna.trait.screenTrait)

    // inject screenTrait into every node of screen if needed
    lab.screen._ls.forEach(screen => {
        if (screen.DNA !== 'hud/Menu') {
            extend(screen, dna.trait.screenTrait)
        }
    })
}
screen.Z = 11

