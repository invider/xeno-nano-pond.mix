const debugInfo = {
    DNA: 'hud/DebugInfo',

    color:      env.style.color.status,
    background: env.style.color.statusBack,

    init: function() {
        extend(this, dna.trait.hidable)
    }
}
