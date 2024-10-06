function normCoord(v) {
    return `${round(v * 100)/100}`
}

function normXY(x, y) {
    return `${normCoord(x)}:${normCoord(y)}`
}
