function mouseWheel(e) {
    if (e.wheelDelta < 0) {
        lab.pond.zoomIn(e.wheelDelta)
    } else {
        lab.pond.zoomOut(e.wheelDelta)
    }
}
