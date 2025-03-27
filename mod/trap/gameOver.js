function gameOver() {
    env.gameOver = true
    env.gameStarted = false
    lab.control.state.transitTo('gameOver')
}
