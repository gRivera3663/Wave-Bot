const prefix = "$"
const ytdl = require("ytdl-core")
const streamOptions = {
    format: "audioonly",
    quality: "highestaudio"
}

// Used to play a certain youtube link in the message sender's voice channel
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

module.exports = (client, message) => {
    // PUBLIC commands
    // (things in between "<>"s are parameters for that command)
    if (message.content.startsWith(prefix)){
        var whole = message.content.slice(prefix.length).trim().split(" ")
        var command = whole[0]

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
            message.reply("this is my god!", {files: ["https://tcbmag.com/wp-content/uploads/2020/03/Brian_Cornell_1.jpg"]})
        }
        // redcard
        else if (command == "redcard"){
            message.reply("would you like to save 5% by opening a Target RedCard today?")
        }   
        // help
        else if (command == "help"){
            var text = "```Wave Bot Commands\n-------------------------\nVOICE CHANNEL SOUNDS\n(Must be in a voice channel for these sounds to play.)\n$driveup\n$opu\n\nTEXT CHANNEL RESPONSES\n$redcard\n$god\n\nFOR ANY ADMIN HELP PLEASE DM THE BOT, AND THE ADMINS WILL GET YOUR MESSAGE```"
            var channel = message.channel
            channel.send(text)

            // Raw Text
            /*
            Wave Bot Commands
            -------------------------
            VOICE CHANNEL SOUNDS
            (Must be in a voice channel for these sounds to play.)
            $driveup
            $opu
            \n
            TEXT CHANNEL RESPONSES
            $redcard
            $god
            \n
            FOR ANY ADMIN HELP PLEASE DM THE BOT, AND THE ADMINS WILL GET YOUR MESSAGE
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