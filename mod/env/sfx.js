// sounds effects are configured here
//
// Each effect has a name which not necessary matches the resource name
// (so you could have multiple sound effect playing the same audio clip).
//
// If the effect name differs from the audio clip resource name,
// set the 'res' value to point to the appropriate audio clip.
//
// Volume sets the relative volume for this particular effect
// (it is multiplied by the master volume in env.opt)
module.exports = {
    pop: {
        // can skip if the SFX name matches the resource name
        //res: 'pop',
        vol: .3,
    },

    /*
    eat: {
        res: 'pop',
        vol: .2,
    },
    */
    seedFood: {
        res: '16737__kijjaz__bubbles_02',
        vol: .75,
    },
    seedFood: {
        res: '16737__kijjaz__bubbles_02',
        vol: .75,
    },

    born: {
        res: 'pop',
        //res: 'bubble',
        vol: .25,
    },

    death: {
        res: 'bubble',
        //res: '16736__kijjaz__bubbles_01',
        vol: .4,
    },

    // UI
    uswitch: {
        res: 'ui-switch',
        vol: .8,
    },


    // try out
    bubbles: {
        res: '16736__kijjaz__bubbles_01',
        vol: .5,
    },
    

    // default option
    default: {
        res: 'chime',
        vol: .7,
    },
}
