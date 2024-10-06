function gameSequence() {
    lab.control.screen.hideAll()

    if (env.config.pond) {
        lab.control.screen.transitTo('pond', {
            fadein:  0,
            keep:    0,
            fadeout: 0.5,

            next: function() {
                trap('newGame')
            },
        })
    } else {
        trap('title')
    }
}
gameSequence.Z = 21
