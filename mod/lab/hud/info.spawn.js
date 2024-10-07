const info = {
    DNA: 'hud/Info',

    color:      env.style.color.status,
    background: env.style.color.statusBack,

    init: function() {
        extend(this, dna.trait.hidable)
    }
}
