function shouldCollide(src, trg) {
    if (src === trg || (trg._ghost || trg.dead || !trg.solids) || (src._ghost || src.dead || !src.solids)) return false
    const xThreshold = trg.w + this.w;
    const yThreshold = trg.h + this.h;
    return !(Math.abs(trg.x - this.x) > xThreshold || Math.abs(trg.y - this.y) > yThreshold)
}

function shouldCollideFast(src, trg) {
    const xThreshold = trg.w + this.w;
    const yThreshold = trg.h + this.h;
    return !(Math.abs(trg.x - this.x) > xThreshold || Math.abs(trg.y - this.y) > yThreshold)
}