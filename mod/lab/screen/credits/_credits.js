const _credits = {
    name: 'credits',

    onShow: function() {
        // detach if already rolling
        if (this.title) this.detach(this.title)

        this.spawn( dna.hud.RollingText, {
            Z:           1,
            name:        'title',
            //img:         res.slides.migRisingUp,
            text:        env.credits,
            font:        env.style.font.credits.head,
            lineHeight:  env.style.font.credits.size * 1.5,
            textColor:   env.style.color.credits,
            shadowColor: env.style.color.creditsShadow,
            background:  env.style.color.creditsBack,
            rx:          .98,
            ry:          .9,
            textAlign:   'right',

            keepLineFor: 30, // seconds
            sdx:         2,
            sdy:         2,
        })
    },

    onHide: function() {
    },
}
