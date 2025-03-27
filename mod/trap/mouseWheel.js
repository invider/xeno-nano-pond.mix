function mouseWheel(e) {
    if (e.wheelDelta < 0) {
        lab.pond.zoomIn(e.wheelDelta)
        //lab.pond.setViewTarget(e.pageX, e.pageY)
    } else {
        lab.pond.zoomOut(e.wheelDelta)
        lab.pond.setViewTarget(e.pageX, e.pageY)
    }

    // dispatch to the active state
    const state = lab.control.state.leadNode()
    if (state) {
        if (isFun(state.mouseWheel)) state.mouseWheel(e)
        if (state.trap && isFun(state.trap.mouseWheel)) state.trap.mouseWheel(e)
    }
}
