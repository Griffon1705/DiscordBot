const Discord = require("discord.js");
const client = new Discord.Client();

const mUtil = require('./util/messageUtilities.js');

const config = require('./config.json');
const TOKEN = config["discord_token"];


const COM = require("./commands/command.js");
const CommandList = COM.CommandList;
const PREFIX = COM.PREFIX;

client.on('ready', () => {
  console.log("Logged in as");
  console.log(client.user.username);
  console.log(client.user.id);
  console.log("------");
  console.log(CommandList);
});

client.on('message', message => {

  if(message.author.id === client.user.id){
    return;
  }

  if(message.content.startsWith('.how are you?')){
    message.channel.send(`I am good. ${mUtil.getMention(message.author.id)}`);
  }

  if(message.content.startsWith(PREFIX)){

    m = message.content;
    command = m.split(" ")[0].substring(1);
    for(c of CommandList){
      if(command === c.trigger){
        c.func(message);
        break;
      }

    }

  }


});

client.on('guildMemberAdd', newMember => {
  guildChannel = newMember.guild.systemChannel;
  if(guildChannel != null){
    guildChannel.send(``);
  }
});

client.login(TOKEN);
