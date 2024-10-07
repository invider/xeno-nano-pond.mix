function gameOver() {
    lab.control.screen.transitTo('gameOver', {
        next: function() {
            //log('fading out from pond')
            trap('newGame')
        }
    })
}
