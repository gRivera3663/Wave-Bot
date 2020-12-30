# Wave-Bot
A Discord bot I made for my personal Discord server.

## Packages Used
- [DiscordJS](https://discord.js.org/#/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ffmpeg](https://ffmpeg.org/)
- [ffbinaries](https://www.npmjs.com/package/ffbinaries)
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg/v/1.7.0)
- [ytdl-core](https://www.npmjs.com/package/ytdl-core)
- [opusscript](https://www.npmjs.com/package/opusscript)
- [NodeJS](https://nodejs.org/en/)

## General Functions
- Functions for all users
- $driveup, $opu: the bot enters a voice channel and plays a certain sound via a YouTube video
- $redcard, $god: the bot sends a message to the channel these functions are typed in
- $jack: the bot sends a random YouTube video to the channel this function is typed in
- $share: the bot takes the current playing Spotify song of the person who typed this function and then shares it to the music channel of the server

## Admin Functions
- Functions for administrators or moderators
- $message <@user> <message content>: the bot directly messages the given user the given message
  
## Other Features
- If a user directly messages the bot, that message will be sent to the admin channel of the server

## How to Use
- You need a bot token in order to use this bot code. Follow [this guide](https://discordpy.readthedocs.io/en/latest/discord.html) in order to obtain one from Discord directly.
- The env file used will need a BOT_TOKEN and SERVER_ID values. The BOT_TOKEN is obtained from the above resource, and the SERVER_ID is obtained on Discord directly. Just right click on your server's name and click "copy ID."
