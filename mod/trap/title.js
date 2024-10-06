function title() {
    lab.control.screen.transitTo('title', {
        fadein:  0,
        keep:    0.2,
        fadeout: 1,

        next: function() {
            log('title is on')
        }
    })
}
