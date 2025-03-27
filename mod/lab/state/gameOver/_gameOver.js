const _gameOver = {
    name: 'gameOver',

    onActivate() {
        this.winnerLabel.text = env.lead.name + ' wins!'
        lib.sfx('gameOver')
    }
}
