const WAITING = 0
const PLAYING = 1
const PAUSED  = 2
const FADEOUT = 3
const FADEIN  = 4
const STOPED  = 5

let track
let nextTrack
let playlist
let trail = []
let state = WAITING

// set a list of track names to choose from
function setPlaylist(tracks) {
    log('setting playlist: ' + tracks.length)
    playlist = tracks
    this.playlist = playlist // expose
}

// select the next track by name
function selectNextTrack( trackName ) {
    if (!trackName) {
        log.warn(`[mixer] missing track name!`)
        return false
    }
    nextTrack = res.tmp.tracks[ trackName ]

    if (nextTrack) {
        return true
    } else {
        log.warn(`[mixer] Can't find track [${trackName}]!`)
        return false
    }
}

// select next track from a playlist
function scheduleNextTrack() {
    if (!playlist) return false
    const trackName = pin.galaxy? pin.galaxy.randomMusicSource.rnde(playlist)
        : lib.math.rnde(playlist)
    //log('[mixer] selecting next track: ' + trackName)
    return selectNextTrack(trackName)
}

// play the named track
// If no name provided, play the already selected one.
function play( trackName, loop, now ) {
    if (trackName) {
        selectNextTrack(trackName)
    }
    if (!nextTrack) {
        this.scheduleNextTrack()
    }
    if (!nextTrack) {
        log.warn(`[mixer] No track to play!`)
        debugger
        return false
    }

    const mixer = this
    const schedule = function() {
        if (!nextTrack) throw "[mixer] can't play - missing the next track"
        if (track) {
            if (!track.paused) {
                track.pause()
            }
            // save trail
            if (track && trail.indexOf(track) < 0) {
                trail.push(track)
            }
        }
        // switch to next
        track = nextTrack
        mixer.track = track // expose current track
        track.pause()
        // make sure all the trail is paused to prevent double play
        trail.forEach(t => {
            if (t !== track && !t.paused) t.pause()
        })

        track.currentTime = 0
        track.loop = !!loop
        track.play()
        track.onended = () => mixer.playNext()
        log(`[mixer] playing "${track.name}"`)

        if (now) {
            track.volume = env.opt.musicVolume
        } else {
            track.volume = 0
            mixer.fadein()
        }
    }
    //this.stop()
    if (track) {
        this.fadeout(schedule)
    } else {
        schedule()
    }
}

function loop(trackName, now) {
    this.play(trackName, true, now)
}

function loopNow(trackName) {
    this.play(trackName, true, true)
}

function playNext(now) {
    this.scheduleNextTrack()
    this.play('', false, now)
}

function playNextNow() {
    this.playNext(true)
}

function pause() {
    if (!track) return
    track.pause()
    status = PAUSED
}

function resume() {
    if (!track) return
    track.play()
    status = PLAYING
}

function stop() {
    if (!track) return
    track.pause()
    track.currentTime = 0
    state = STOPED
}

function fadeout(next) {
    this.onFadeout = next
    this.state = FADEOUT
}

function fadein(next) {
    this.onFadein = next
    this.state = FADEIN
}

function isPlaying() {
    return (this.state === PLAYING || this.state === FADEIN || this.state === FADEOUT)
}

function evo(dt) {
    if (!track) return
    if (this.state === FADEOUT) {
        track.volume = max(track.volume - env.tune.mixer.fadeOutSpeed * env.opt.musicVolume * dt, 0)
        if (track.volume === 0) {
            track.pause()
            this.state = STOPED
            //log(`[mixer] pausing "${track.name}"`)
            if (this.onFadeout) this.onFadeout()
        }
    } else if (this.state === FADEIN) {
        track.volume = min(track.volume + env.tune.mixer.fadeInSpeed * env.opt.musicVolume * dt, env.opt.musicVolume)
        if (track.volume === env.opt.musicVolume) {
            this.state = PLAYING
            if (this.onFadein) this.Fadein()
        }
    }
}

