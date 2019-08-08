const Discord = require('discord.js');
const mUtil = require('../util/messageUtilities.js');
const permissions = require('./permissions.js')

const PREFIX = "."

class Command {

  constructor(trigger, func, desc){
    this.trigger = trigger;
    this.func = func;
    this.desc = desc;
  }

}


const CommandList = [
  new Command("hello", greeting, "Greets the player."),
  new Command("hello!", greetingExtended, "Greets the player with a mention."),
  new Command("help", showCommands, "Shows list of all the commands."),
  new Command("mods", listMods, "Shows all the moderaters on the server.")
]

function greeting(message){
  message.channel.send("Hello!");
}

function greetingExtended(message){
  message.channel.send(`Hello, ${mUtil.getMention(message.author.id)}!`);
}

function showCommands(message){

  let embed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setDescription("List of all the commands: ");

    for(c of CommandList){
      if(c.desc != ""){
        embed.addField(PREFIX+c.trigger, c.desc, false);
      }
    }

    message.channel.send(embed);

}

function listMods(message){

  let guild = message.guild;

  if(guild == null) {return};

  mods = []


  for (member of guild.members.values()){

    if(permissions.hasMediumPermissions(guild, member.user) && !member.user.bot){
      mods.push(member);
    }
  }

  let embed = new Discord.RichEmbed()
    .setTitle("Moderators")
    .setDescription("List of all the moderators on the server");

  for(mod of mods){
    try{
      if(mod.nickname){
        embed.addField(mod.user.username, `Nickname: ${mod.nickname}`, true);
      }else{
        embed.addField(mod.user.username, "-", true);
      }
    }catch(e){
      break;
    }
  }

  message.channel.send(embed);

}


module.exports = {CommandList, PREFIX}
