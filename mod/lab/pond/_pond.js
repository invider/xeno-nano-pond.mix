const _pond = {
    Z:    11,
    DNA:  'SlideCamera',
    name: 'pond',
    w:    2000,
    h:    2000,
    speed: ctx.width * .25,
    zoomOnPlusMinus: true,

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

    onShow() {
        log('showing pond')
        lab.hud.show()
    },

    onHide() {
        log('hiding pond')
        lab.hud.hide()
    },
}
