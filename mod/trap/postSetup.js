function postSetup() {
    lab.control.state.deactivateAll()

    if (env.config.pond) {
        lab.control.state.transitTo('pond', {
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
