const cellTypes = {
    'froggy': {
        img: res.cell.froggy,
        lifespan: 10,
        baseHp: 200,
        team: 1,
        cellType: 'froggy',
        centers: [
            {
                x: 0,
                y: 0,
                r: 16
            }
        ]
    },
    'jelly': {
        img: res.cell.jelly,
        lifespan: 40,
        team: 2,
        baseHp: 60,
        cellType: 'jelly',
        centers: [
            {
                x: 0,
                y: 0,
                r: 16
            }
        ]
    },
    'orange': {
        img: res.cell.orangy,
        lifespan: 20,
        baseHp: 80,
        cellType: 'orange',
        team: 3,
        centers: [
            {
                x: 0,
                y: 0,
                r: 16
            }
        ]
    },
    'swampy': {
        img: res.cell.swampy,
        lifespan: 15,
        baseHp: 150,
        cellType: 'swampy',
        team: 4,
        centers: [
            {
                x: 0,
                y: 0,
                r: 16
            }
        ]
    },
    'brownie': {
        img: res.cell.brownie,
        lifespan: 30,
        baseHp: 90,
        team: 5,
        cellType: 'brownie',
        centers: [
            {
                x: 0,
                y: 0,
                r: 16
            }
        ]
    }
}

function getMaxHp() {
    let maxHp = 0;
    for (let k in cellTypes) {
        maxHp = Math.max(cellTypes[k].baseHp, maxHp);
    }
    return maxHp
}
const maxHp = getMaxHp();
