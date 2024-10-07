const _pond = {
    Z:    11,
    DNA:  'SlideCamera',
    name: 'pond',
    w:    2000,
    h:    2000,
    zoomSpeed:       1.2,
    zoomScrollSpeed: 1.8,
    zoomOnPlusMinus: true,

    speed: ctx.width * .5,
    slideSpeed: ctx.width * .5,
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
        this.scaleTarget = this.scale / this.zoomScrollSpeed
    },

    zoomOut: function(dt) {
        this.scaleTarget = this.scale * this.zoomScrollSpeed
    },

    evo: function(dt) {
        this._ls.forEach( e => {
            if (e.evo && !e.dead && !e.paused) e.evo(dt)
        })

        if (this.target) this.evoFollow(dt)

        if (this.keys[0]) {
            this.scale *= 1 + this.zoomSpeed * dt
        }
        if (this.keys[1]) {
            this.scale *= 1 - this.zoomSpeed * dt
        }

        if (this.scaleTarget) {
            if (this.scale < this.scaleTarget) {
                this.scale *= 1 + this.zoomSpeed * dt
                if (this.scale > this.scaleTarget) {
                    this.scale = this.scaleTarget
                    this.scaleTarget = 0
                }

            } else if (this.scale > this.scaleTarget) {
                this.scale *= 1 - this.zoomSpeed * dt
                if (this.scale < this.scaleTarget) {
                    this.scale = this.scaleTarget
                    this.scaleTarget = 0
                }
            }
        }
    },

    /*
    evoZoom: function(dt) {
        if (this.scale === this.targetScale) return
        if (this.scale < this.targetScale) {
            this.scale *= 1 + (this.scaleRate * dt)
            if (this.scale >= this.targetScale) this.scale = this.targetScale
        } else if (this.scale > this.targetScale) {
            this.scale /= 1 + (this.scaleRate * dt)
            if (this.scale <= this.targetScale) this.scale = this.targetScale
        }
    }
    */
}
