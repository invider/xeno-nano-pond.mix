const _pond = {
    DNA:  'SlideCamera',
    name: 'pond',
    w:    5000,
    h:    5000,
    speed: ctx.width * .25,

    setTarget: function(x, y) {
        this.target = { x, y }
    },

    setViewTarget: function(vx, vy) {
        this.target = {
            x: this.lx(vx),
            y: this.ly(vy),
        }
    },

    lookAtCenter() {
        this.setTarget( rx(.5), ry(.5) )
    },
}
