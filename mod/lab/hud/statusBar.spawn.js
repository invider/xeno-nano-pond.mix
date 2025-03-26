const DNA = 'hud/StatusBar'

const MIN_DELAY = 2

const name = 'status'

function init() {
    this.timer = 0
    this.lines = []
    this.color = env.style.color.status
    this.background = env.style.color.statusBack
}

function evo(dt) {
    if (env.state !== 'pond') return

    const lines = []
    const picked = []
    lab.pond.pick(env.mouse.x, env.mouse.y, picked)
    picked.forEach(node => {
        if (node.getStatus) lines.push( node.getStatus() )
    })

    if (lines.length === 0) {
        if (this.lines.length !== 0 && this.timer < MIN_DELAY) {
            this.timer += dt
            return
        } else {
            this.timer = 0
        }
    } else {
        this.timer += dt
    }
    this.lines = lines
    this.tag = lines.join('\n')
}
