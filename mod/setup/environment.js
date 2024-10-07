function environment() {
    // set the debug flag from collider.jam config
    env.debug = !!env.config.debug

    lab.background = env.style.color.background
}
environment.Z = 1
