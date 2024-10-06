function flag(args, line, con) {

    if (args.length >= 2) {
        const key = args[1]
        env.flag[key] = !env.flag[key]
        con.print(key + ': ' + (env.flag[key]? 'on' : 'off'))
        return
    }

    Object.keys(env.flag).forEach(key => {
        const val = env.flag[key]
        con.print(key + ': ' + (val? 'on' : 'off'))
    })
}
flag.info = 'list of set flags on/off'

