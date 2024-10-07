const _ghost = true

function evo(dt) {
    const cam = this.__

    const hEdge = rx(cam.relativeEdge),
          vEdge = ry(cam.relativeEdge),
          mx = env.mouse.x,
          my = env.mouse.y

    if (mx < hEdge) cam.slideLeft(dt)
    else if (mx > ctx.width - hEdge) cam.slideRight(dt)
    if (my < vEdge) cam.slideUp(dt)
    else if (my > ctx.height - vEdge) cam.slideDown(dt)
}
