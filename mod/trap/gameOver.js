function gameOver() {
    env.gameStarted = true
    env.gameOver = true
    lab.control.state.transitTo('gameOver', {})
}
