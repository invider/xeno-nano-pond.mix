const style = {
    //background: hsl(.04, .05, .2),
    //background: hsl(.04, .05, .1),

    color: {
        background:  '#ab9b8e',
        outside:     '#847875',
        title:       '#49343d',
        subTitle:    '#49343d',
        status:      '#d2c9a5',
        statusBack:  '#392945DE',

        credits:       '#71627d',
        creditsShadow: '#000000',
        creditsBack:   '#ab9b8e',

        menu: {
            main:        '#49343d',
            deactivated: '#71627d',
            selected:    '#e2d9frontb5',
        }
    },

    font: {
        main: {
            family: 'futura-handwritten',
            size: 16,
        },
        menu: {
            family: 'futura-handwritten',
            size: 48,
        },
        menuHigh: {
            family: 'futura-handwritten',
            size: 52,
        },
        title: {
            family: 'bakso-sapi',
            //family: 'asteristico',
            //family: 'cakecafe',
            size: 48,
        },
        subTitle: {
            family: 'bakso-sapi',
            //family: 'asteristico',
            //family: 'cakecafe',
            size: 28,
        },
        credits: {
            family: 'bakso-sapi',
            //family: 'asteristico',
            //family: 'cakecafe',
            size: 32,
        },
        info: {
            family: 'futura-handwritten',
            size: 24,
        },
        dump: {
            family: 'futura-handwritten',
            size: 12,
        },
        debug: {
            family: 'futura-handwritten',
            size: 24,
        },
    }
};

(function classifyFonts() {
    // classify fonts
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
})()
