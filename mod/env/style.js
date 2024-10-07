const style = {
    //background: hsl(.04, .05, .2),
    background: hsl(.04, .05, .1),

    font: {
        main: {
            family: 'futura-handwritten',
            size: 16,
        },
        menu: {
            family: 'futura-handwritten',
            size: 48,
        },
        title: {
            family: 'bakso-sapi',
            //family: 'asteristico',
            //family: 'cakecafe',
            size: 48,
        },
        dump: {
            family: 'futura-handwritten',
            size: 12,
        },
        debug: {
            family: 'futura-handwritten',
            size: 20,
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
