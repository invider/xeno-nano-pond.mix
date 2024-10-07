const _pond = {
    Z:    11,
    DNA:  'SlideCamera',
    name: 'pond',
    w:    2000,
    h:    2000,
    speed: ctx.width * .5,
    slideSpeed: ctx.width * .5,
    zoomScrollSpeed: 1.1,

    zoomOnPlusMinus: true,
    relativeEdge: .05,

    setTarget: function(x, y) {
        this.target = { x, y }
    },

    setViewTarget: function(vx, vy) {
        this.target = {
            x: this.lx(vx),
            y: this.ly(vy),
        }
    },

    lookAtCenter: function() {
        this.setTarget( rx(.5), ry(.5) )
    },

    onShow: function() {
        log('showing pond')
        lab.hud.show()
    },

    onHide: function() {
        log('hiding pond')
        lab.hud.hide()
    },

    selfTarget: function() {
        if (this.target) return
        this.target = {
            x: this.x,
            y: this.y,
        }
    },

    slideLeft: function(dt) {
        this.x -= (this.slideSpeed * dt) / this.scale
    },

    slideRight: function(dt) {
        this.x += (this.slideSpeed * dt) / this.scale
    },

    slideUp: function(dt) {
        this.y -= (this.slideSpeed * dt) / this.scale
    },

    slideDown: function(dt) {
        this.y += (this.slideSpeed * dt) / this.scale
    },

    zoomIn: function(dt) {
        this.scale /= this.zoomScrollSpeed
    },

    zoomOut: function(dt) {
        this.scale *= this.zoomScrollSpeed
    },

}
