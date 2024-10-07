function teams() {
    const teams = []
    const cellTypes = dna.pond.cellConfig.cellTypes
    Object.keys(cellTypes).forEach(key => {
        const type = cellTypes[key]
        teams[type.team] = {
            id:       type.team,
            img:      type.img,
            cellType: type.cellType,
        }
    })
    env.teams = teams
}
teams.Z = 2
