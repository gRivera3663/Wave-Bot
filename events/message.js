// prefix for commands
const prefix = "$"

// Library requirements
const { MessageAttachment } = require("discord.js")
const ytdl = require("ytdl-core")

// Steam Options for YTDL
const streamOptions = {
    format: "audioonly",
    quality: "highestaudio"
}

// Links to Jack in the Box Commercials for $jack
const jackLinks = [
    "https://www.youtube.com/watch?v=AJF9NUQSRIM",
    "https://www.youtube.com/watch?v=v1v-16QUESk",
    "https://www.youtube.com/watch?v=BYMt_HdQmns",
    "https://www.youtube.com/watch?v=m2TApGQUWF0",
    "https://www.youtube.com/watch?v=uKvD7R7wDO8",
    "https://www.youtube.com/watch?v=bN3j_i847b4",
    "https://www.youtube.com/watch?v=OZFA87ZF71U",
    "https://www.youtube.com/watch?v=W1GtVPDjfwc",
    "https://www.youtube.com/watch?v=zf5i0O2PNS4",
    "https://www.youtube.com/watch?v=QdKwWUIo2r4",
    "https://www.youtube.com/watch?v=PyusO5s8YIA",
    "https://www.youtube.com/watch?v=tFZpazWqOFw",
    "https://www.youtube.com/watch?v=8OsjlRgakkM",
    "https://www.youtube.com/watch?v=o5MXLep0cOo",
    "https://www.youtube.com/watch?v=1aCh_3boZ7g",
    "https://www.youtube.com/watch?v=sRv9_Q3HOmg",
    "https://www.youtube.com/watch?v=fkwOdaFRHlw",
    "https://www.youtube.com/watch?v=xS2O_Dxkldw",
    "https://www.youtube.com/watch?v=RkG7DF1w5GI",
    "https://www.youtube.com/watch?v=r5rlbOqQq7w",
    "https://www.youtube.com/watch?v=7lsvFX1AWTc",
    "https://www.youtube.com/watch?v=pD5-Ov1pwL8",
    "https://www.youtube.com/watch?v=PmUgEdf9UdI",
    "https://www.youtube.com/watch?v=XVjO4N-7ZwQ",
    "https://www.youtube.com/watch?v=2TkRn2AfNCc",
    "https://www.youtube.com/watch?v=1AX6-1JdDsA",
    "https://www.youtube.com/watch?v=8IFpt6lkiwA",
    "lhttps://www.youtube.com/watch?v=zzNFYFAS9ZA",
    "https://www.youtube.com/watch?v=091fePpOojM",
    "https://youtu.be/2JCDcSXDugo",
    "https://www.youtube.com/watch?v=f6Cls-4t9B8",
    "https://youtu.be/IQSVfrDb0pM",
    "https://youtu.be/JWA1AFqzYnU",
    "https://youtu.be/Do5Ctnw0b3g",
    "https://youtu.be/JQLZL7x23Zo",
    "https://youtu.be/9dCGdNeBzLg",
    "https://youtu.be/OC8Fhhlj2eU",
    "https://youtu.be/RbOkOwsqBuo",
    "https://youtu.be/rOWk4-hsFFM",
    "https://youtu.be/M-flk-U8Kj0",
    "https://youtu.be/ek20iEplvgE",
    "https://www.youtube.com/watch?v=5L8hHDcFDGY",
    "https://youtu.be/pKdnCQzf_uQ",
    "https://youtu.be/ShxsfnNcknw",
    "https://www.youtube.com/watch?v=Yns0DtN97UQ",
    "https://www.youtube.com/watch?v=Ay-RsLbGVmk",
    "https://www.youtube.com/watch?v=1izHRMqgqJs",
    "https://www.youtube.com/watch?v=xk7iJr3pZ2E"
]

// Used to play the given YouTube link in the message sender's voice channel
function playLink(message, link){
    var voiceChannel = message.member.voice.channel
    if (!voiceChannel){
        message.reply("You need to be in a voice channel to use this command.")
    } else {
        var permissions = voiceChannel.permissionsFor(message.client.user)
    
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            message.reply("I need the join and speak permissions to use this command.")
        } else {
            voiceChannel.join().then(connection => {
                connection.play(ytdl(link, streamOptions)).on("finish", finish => {voiceChannel.leave()})
            }).catch(error => {console.log(error)})
        }
    } 
}

// Determines whether or not the user given is on Spotify or not. If
// the user is on Spotify it returns the song ID of the current song.
// Returns a 0 if nothing is found (not on Spotify).
function isUserOnSpotify(user){
    var songID
    for (var i = 0; i < user.presence.activities.length; i++){
        if(user.presence.activities[i].name === "Spotify"){
            songID = user.presence.activities[i].syncID
            break
        } else {
            songID = 0
        }
    }
    return songID
}

module.exports = (client, message) => {
    // PUBLIC commands
    // (things in between "<>"s are parameters for that command)
    if (message.content.startsWith(prefix)){
        var whole = message.content.slice(prefix.length).trim().split(" ")
        var command = whole[0]
        var user = message.author

        // driveup
        if (command == "driveup"){
            playLink(message, "https://www.youtube.com/watch?v=FQc5zRy6wBU")
        }
        // opu
        else if (command == "opu"){
            playLink(message, "https://www.youtube.com/watch?v=0n0-IcQiG4g")
        }
        // god
        else if (command == "god"){
            message.channel.send("All hail Brian Cornell. :pray:", new MessageAttachment('https://tcbmag.com/wp-content/uploads/2020/03/Brian_Cornell_1.jpg'))
        }
        // redcard
        else if (command == "redcard"){
            message.reply("would you like to save 5% by opening a Target RedCard today?")
        }
        // share
        else if (command == "share" && isUserOnSpotify(user) !== 0){
            var url = `https://open.spotify.com/track/${isUserOnSpotify(user)}`
            var sendTo = client.channels.fetch(process.env.SPOTIFY_SHARING_CHANNEL)
            url.toString()

            var userID = message.author.id

            if (userID != process.env.BOT_ID){
                sendTo.then( message => {
                    var temp = "<@" + userID + "> shared this song from Spotify: " + url
                    message.send(temp).catch(error => {console.log(error)})
                })
            }
        }
        // jack
        else if (command == "jack"){
            var index = Math.floor(Math.random() * jackLinks.length)
            message.channel.send(jackLinks[index])
        }
        // ERROR FOR share
        else if (command == "share" && isUserOnSpotify(user) === 0){
            message.reply("to use this command your Spotify must be connected to your Discord and the \"Display Spotify as your status\" setting must be turned on. You can enable this in Settings -> Connections")
        }  
        // help
        else if (command == "help"){
            var text = "```Wave Bot Commands\n" +
            "***NOTE: FOR ANY ADMIN HELP PLEASE DM THE BOT***\n" +
            "-------------------------\n" +
            "VOICE CHANNEL SOUND COMMANDS\n\n" +
            "$driveup\n" +
            "$opu\n" +
            "-------------------------\n" +
            "COMMANDS\n" +
            "(Anything in \"<>\"s are other things the command needs to work.)\n\n" +
            "$redcard\n" +
            "$god\n" +
            "$jack\n" +
            "$share >> Shares the current song you are listening to on Spotify.\n" +
            "-------------------------```"

            var channel = message.channel
            channel.send(text)

            // Raw Text
            /*
            Wave Bot Commands
            ***NOTE: FOR ANY ADMIN HELP PLEASE DM THE BOT***
            -------------------------
            VOICE CHANNEL SOUND COMMANDS

            $driveup
            $opu
            -------------------------
            OTHER COMMANDS
            (Anything in "<>"s are other things the command needs to work.)

            $redcard
            $god
            $jack
            $share >> Shares the current song you are listening to on Spotify.
            -------------------------
            */
        }
    }


    // ADMIN commands
    // (things in between "<>"s are parameters for that command)
    if (message.channel.id === process.env.ADMIN_CHANNEL){
        if(message.content.startsWith(prefix)){
            var whole = message.content.slice(prefix.length).trim().split(" ")
            var command = whole[0]
            
            // message <user> <message>
            if (command == "message"){
                if (whole[1] == null){
                    message.reply("You need to @ a user to use this command")
                }
                else if (whole[2] == null){
                    message.reply("You need to include a message while using this command")
                } else {
                    var user = whole[1]
                    user = user.slice(1)
                    user = user.slice(1)
                    user = user.slice(1)
                    user = user.slice(0, user.length - 1)
                    var sendTo = client.users.cache.get(user)
                    var msg = whole[2]
                    if (whole.length >= 4){
                        for (var i = 3; i < whole.length; i++){
                            msg += " " + whole[i]
                        }
                    }
                    sendTo.send(msg).catch(error => {console.log(error)})
                }
            }
            // controls
            else if (command == "controls"){
                var text = "```Admin Wave Bot Commands\n" +
                "(Please note that \"$controls\" is for admin controls, while \"$help\" is for public commands)\n" +
                "-------------------------\n" +
                "$message <@user> <message content> >> Messages the given user with the Wave Bot.\n" +
                "-------------------------```"

                var channel = client.channels.fetch(process.env.ADMIN_CHANNEL)
                channel.then(message => {
                    message.send(text).catch(error => {console.log(error)})
                })

                // Raw Text
                /*
                Admin Wave Bot Commands
                (Please note that "$controls" is for admin help, while "$help" is for public commands)
                -------------------------
                $message <@user> <message content> >> Messages the given user with the Wave Bot.
                -------------------------
                */
            }
        }
    }

    // When a user directly messages the bot, the message will be sent to the admin channel
    if(message.channel.type === "dm"){
        var channel = client.channels.fetch(process.env.ADMIN_CHANNEL)
        var msg = message.content.toString()
        var user = message.author.id

        if (user != process.env.BOT_ID){
            channel.then( message => {
                var temp = "<@" + user + "> sent a message to the Wave Bot: " + msg
                message.send(temp).catch(error => {console.log(error)})
            })
        }
    }

}