module.exports = (client, member) => {
    // every new user will automatically be given the default role
    
    // commenting out until it works
    /*
    var role = member.guild.roles.fetch(process.env.DEFAULT_ROLE)
    member.roles.add(role).catch(error => {console.log(error)})
    */
}

// code that works with "message"
/*
    else if (command == "test"){
        var role = message.guild.roles.fetch(process.env.DEFAULT_ROLE)

        // getting cass as test member (in theory should be any user)
        var testMember = message.guild.members.fetch("690754520430542871")
        role.then(msg => {
            testMember.then(message => {
                message.roles.add(msg).catch(error => {console.log(error)})
            })
        })
    }
*/