const FQ = 2

let timer = FQ

function calcStat() {
    let hp = 0
    let cells = 0
    const teams = []
    for (let i = 0; i <= env.tune.teams; i++) {
        teams[i] = {
            id:    i,
            name:  'team' + i,
            cells: 0,
            hp:    0,
        }
    }

    lab.pond._ls.forEach(e => {
        if (e instanceof dna.pond.Cell) {
            cells ++
            hp += e.hp
            teams[e.team].cells ++
            teams[e.team].hp += e.hp
            teams[e.team].icon = e.descriptor.img
        }
    })

    lab.hud.debugInfo.set('cells', '' + cells)
    lab.hud.debugInfo.set('hp', '' + hp)
    teams.forEach(team => {
        if (team.cells > 0) {
            lab.hud.debugInfo.set(team.name, '' + team.cells + '/' + team.hp, team.icon)
        }
    })
}

function evo(dt) {
    timer -= dt
    if (timer < 0) {
        this.calcStat()
        timer = FQ
    }
}
