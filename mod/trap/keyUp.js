function keyUp(e) {
    // dispatch to the active state
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.keyUp)) state.keyUp(e)
        if (state.trap && isFun(state.trap.keyUp)) state.trap.keyUp(e)
    }
}
