function init() {
    // name MUST be removed to avoid augmentation collision
    delete this.name
}

function hide() {
    this.hidden = true
    this.paused = true
    this.disabled = true
    if (this.onHide) this.onHide()
    /*
    if (this.control) {
        lab.control.global.release(this.control)
    }
    */
}

function show() {
    this.hidden = false
    this.paused = false
    this.disabled = false
    if (this.onShow) this.onShow()
    /*
    if (this.control) {
        lab.control.global.capture(this.control)
    }
    */
}

/*
captureControl(control) {
    if (!control) return
    this.control = control
    lab.control.global.capture(this.control)
}
*/

