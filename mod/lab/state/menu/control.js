function toggleResumeGameOption() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !env.gameStarted
}

function onActivate() {
    this.toggleResumeGameOption()
}

function onDeactivate() {
}

