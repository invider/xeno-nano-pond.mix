const _gameOver = {
    name: 'gameOver',

    onShow() {
        this.winnerLabel.text = env.lead.name + ' wins!'
        lib.sfx('gameOver')
    }
}
