const DNA = 'hud/StatusBar'

const name = 'status'

function evo(dt) {
    if (env.screen !== 'pond') return

    const lines = []
    const picked = []
    lab.pond.pick(env.mouse.x, env.mouse.y, picked)
    picked.forEach(node => {
        if (node.getStatus) lines.push( node.getStatus() )
    })

    this.lines = lines
    this.tag = lines.join('\n')
}