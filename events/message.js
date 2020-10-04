const prefix = "$"
const ytdl = require("ytdl-core")
const streamOptions = {
    format: "audioonly",
    quality: "highestaudio"
}

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
            message.reply("this is my god!", {files: ['https://tcbmag.com/wp-content/uploads/2020/03/Brian_Cornell_1.jpg']})
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
        // ERROR FOR share
        else if (command == "share" && isUserOnSpotify(user) === 0){
            message.reply("to use this command your Spotify must be connected to your Discord and the \"Display Spotify as your status\" setting must be turned on. You can enable this in Settings -> Connections")
        }  
        // help
        else if (command == "help"){
            var text = "```Wave Bot Commands\n***NOTE: FOR ANY ADMIN HELP PLEASE DM THE BOT***\n-------------------------\nVOICE CHANNEL SOUND COMMANDS\n(Sounds that play while in a voice channel.)\n[Must be in a voice channel for these sounds to play.]\n\n$driveup\n$opu\n-------------------------\nTEXT CHANNEL RESPONSE COMMANDS\n(Bot just responds in text channel.)\n\n$redcard\n$god\n-------------------------\nCOMMANDS\n(Each command does something different. Anything in \"<>\"s are other things the command needs to work.)\n\n$share [Shares the current song you are listening to on Spotify. Spotify must be connected and visible as your status for this to work.]\n-------------------------\```"
            var channel = message.channel
            channel.send(text)

            // Raw Text
            /*

            Wave Bot Commands
            ***NOTE: FOR ANY ADMIN HELP PLEASE DM THE BOT***
            -------------------------
            VOICE CHANNEL SOUND COMMANDS
            (Sounds that play while in a voice channel.)
            [Must be in a voice channel for these sounds to play.]
            $driveup
            $opu
            \n
            TEXT CHANNEL RESPONSE COMMANDS
            (Bot just responds in text channel.)
            $redcard
            $god
            \n
            COMMANDS
            (Each command does something different. Anything in "<>"s are other things the command needs to work.)
            $share [Shares the current song you are listening to on Spotify. Spotify must be connected and visible as your status for this to work.]

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
                var text = "```Admin Wave Bot Commands\n(Please note that \"$controls\" is for admin controls, while \"$help\" is for public commands)\n-------------------------\nMESSAGES THE USER VIA THE WAVE BOT\n$message <@user> <message content>```"
                var channel = client.channels.fetch(process.env.ADMIN_CHANNEL)
                channel.then(message => {
                    message.send(text).catch(error => {console.log(error)})
                })

                // Raw Text
                /*
                Admin Wave Bot Commands
                (Please note that "$controls" is for admin help, while "$help" is for public commands)
                -------------------------
                MESSAGES THE USER VIA THE WAVE BOT
                $message <@user> <message content>
                */
            }
        }
    }

    // When a user directly messages the bot, the message will be sent to the admin channel
    if(message.channel.type === "dm"){
        var channel = client.channels.fetch(process.env.ADMIN_CHANNEL)
        var msg = message.content.toString()
        var user = message.author.id

        if (user != "Wave Bot#8159"){
            channel.then( message => {
                var temp = "<@" + user + "> sent a message to the Wave Bot: " + msg
                message.send(temp).catch(error => {console.log(error)})
            })
        }
    }

}