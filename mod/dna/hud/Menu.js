const df = {
    x: 0,
    y: 0,
    w: 400,
    h: 40,
    step: 60,
    border: 2,
    shadowShift: 6,
    IDLE_TIMEOUT: 20,

    current:  0,
    hidden:   true,
    paused:   true,
    disabled: true,
    
    showBackground: false,
    showBackline:   false,

    debug:          false,
}

// check if the item is a switch represented by an array
function isSwitch(item) {
    return isArray(item)
}

function isOption(item) {
    return (isObj(item) && item.option)
}

class Menu {

    constructor(st) {
        this.syncTheme()
        extend(this, df, st)
        this.trap = {}
    }

    syncTheme() {
        this.color = {
            main:        '#f2c157',
            selected:    '#e35730',
            deactivated: '#808080',
            disabled:    '#ffff80',

            background:  '#404040',
            shadow:      '#00000080',
            backline:    '#606060',
            activeBackline: '#808080',
        }
    }

    adjust() {
        this.x = rx(.5)
        this.y = ry(.5)
        this.w = rx(.5)
        this.h = this.activeItems() * this.step
    }

    show() {
        this.adjust()
        this.hidden = false
        this.paused = false
        this.disabled = false
        this.lastTouch = Date.now()

        lab.control.controller.saveAll()
        lab.control.controller.bindAll(this)
        if (this.trap.onShow) this.trap.onShow()
    }

    hide() {
        this.hidden = true
        this.paused = true
        this.disabled = true
        lab.control.controller.restoreAll()
        if (this.trap.onHide) this.trap.onHide()
    }

    // select from items provided in st object
    // The st object can contains items array and traps object.
    // Traps handle events like onSelect and onIdle.
    // @param preservePos the selector's position is not changed when set to true
    selectFrom(items, trap, preservePos) {
        this.items = items
        if (trap) {
            this.trap = trap
            this.trap.__ = this
        }
        if (preservePos) this.current = 0

        this.items.forEach(item => {
            if (isSwitch(item) || isOption(item)) {
                if (!item.current) item.current = 0
                if (item.load) item.load()
            }
        })

        this.slideToNextActiveItem()
        this.show()
    }

    slideToNextActiveItem() {
        const item = this.items[this.current]
        if (isObj(item) && item.section) {
            this.current ++
            if (this.current >= this.items.length) this.current = 0
            this.slideToActiveItem()
        }
    }

    next() {
        if (this.hidden) return
        this.current ++
        if (this.current >= this.items.length) this.current = 0

        const item = this.items[this.current]
        if (isObj(item) && (item.section || item.disabled)) {
            this.next()
        } else {
            // landed
            if (this.onMove) this.onMove(item)
            lib.sfx('select')
        }
    }

    prev() {
        if (this.hidden) return
        this.current --
        if (this.current < 0) this.current = this.items.length - 1

        const item = this.items[this.current]
        if (isObj(item) && (item.section || item.disabled)) {
            this.prev()
        } else {
            // landed
            if (this.onMove) this.onMove(item)
            lib.sfx('select')
        }
    }

    left() {
        if (this.hidden) return
        const item = this.currentItem()
        if (isSwitch(item)) {
            item.current --
            if (item.current < 0) item.current = item.length - 1
            if (this.onSwitch) this.onSwitch(item, this.current)
            lib.sfx('apply')
        } else if (isOption(item)) {
            item.current --
            if (item.current < 0) item.current = item.options.length - 1
            if (this.onSwitch) this.onSwitch(item, this.current)
            if (item.sync) item.sync()
            lib.sfx('apply')
        }
        if (this.onMove) this.onMove(item)
    }

    right() {
        if (this.hidden) return
        const item = this.currentItem()
        if (isSwitch(item)) {
            item.current ++
            if (item.current >= item.length) item.current = 0
            if (this.onSwitch) this.onSwitch(item, this.current)

            lib.sfx('apply')
        } else if (isOption(item)) {
            item.current ++
            if (item.current >= item.options.length) item.current = 0
            if (this.onSwitch) this.onSwitch(item, this.current)
            if (item.sync) item.sync()
            lib.sfx('apply')
        }
        if (this.onMove) this.onMove(item)
    }

    select() {
        const item = this.currentItem()
        if (isSwitch(item) || isOption(item)) {
            this.right()
        } else {
            if (this.trap.onSelect) {
                this.trap.onSelect(item, this.current)
                lib.sfx('use')
            }
        }
    }

    back() {
        if (this.onBack) {
            this.onBack( this.currentItem() )
        }
        lib.sfx('back')
    }

    activate(action) {
        this.lastTouch = Date.now()
        switch(action) {
            case env.bind.UP:    this.prev();   break;
            case env.bind.LEFT:  this.left();   break;
            case env.bind.DOWN:  this.next();   break;
            case env.bind.RIGHT: this.right();  break;
            case env.bind.FIRE:  this.select(); break;
            case env.bind.ALT:   this.back();   break;
        }
    }

    focusOn(name) {
        const i = this.items.indexOf(name)
        if (i >= 0) this.current = i
    }

    drawDebug() {
        lineWidth(2)
        stroke('#ffff00')
        rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        lib.draw.cross(this.x, this.y, 20)
    }

    draw() {
        if (!this.items) return // nothing to show!

        if (env.debug && this.debug) this.drawDebug()

        const n = this.items.length
        const cx = this.x
        const cy = this.y - floor(this.h/2)

        alignCenter()
        baseTop()
        font(env.style.menuFont)

        const b = this.border
        const x = cx
        const rw = this.w
        const rx = floor(this.x - rw/2)
        const h = n * this.step + 2*b
        let y = cy

        if (this.showBackground) {
            fill(this.color.background)
            rect(rx, y-h/2, rw, h)
        }

        for (let i = 0; i < n; i++) {
            let hidden = false
            let active = true
            let disabled = false
            let item = this.items[i]
            if (isArray(item)) {
                if (item.hidden) hidden = true
                if (item.disabled) disabled = true
                item = '< ' + item[item.current] + ' >'
            } else if (isObj(item)) {
                if (item.section) {
                    active = false
                    item = item.title
                } else if (item.option) {
                    item = item.title + ': ' + item.options[item.current]
                }
            }

            if (!hidden) {
                if (this.showBackline) {
                    if (i === this.current) fill(this.color.activeBackline)
                    else fill(this.color.backline)
                    rect(rx+b, y-1, rw-2*b, this.step-2)
                }


                fill(this.color.shadow)
                text(item, x + this.shadowShift, y + this.shadowShift)

                if (!active) fill(this.color.deactivated)
                else if (disabled) fill(this.color.disabled)
                else if (i === this.current) fill(this.color.selected)
                else fill(this.color.main)
                text(item, x, y)
                y += this.step
            }
        }
    }

    currentItem() {
        return this.items[this.current]
    }

    activeItems() {
        if (!this.items) return 0

        let rs = 0
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (isObj(item)) {
                if (!item.hidden) rs++
            } else {
                rs++
            }
        }
        return rs
    }

    selectedValue(i) {
        const item = this.items[i]
        if (isString(item)) return item
        else if (isArray(item)) {
            return item[item.current]
        }
    }

    evo(dt) {
        const idle = (Date.now() - this.lastTouch)/1000
        if (this.trap.onIdle && idle >= this.IDLE_TIMEOUT) {
            this.trap.onIdle()
            this.lastTouch = Date.now()
        }
    }
}
