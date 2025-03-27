const items = [
    {
        title: 'New Game',
        select: function(menu) {
            lab.control.state.transitTo('pond', {
                next: function() {
                    trap('newGame')
                },
            })
        },
    },
    {
        title: 'Options',
        submenu: 'options',
    },
    {
        title: 'Credits',
        select: function() {
            lab.control.state.transitTo('credits')
        }
    },
    {
        id:     'resume',
        hidden:  true,
        title:  'Resume Game',
        select: function() {
            lab.control.state.transitTo('dust')
        },
    },
]
items.title = env.label.TITLE
