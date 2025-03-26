function newGame() {
    env.gameStarted = true
    env.gameOver    = false
    lab.pond.resetGame()
    lib.sfx('pop')
}
