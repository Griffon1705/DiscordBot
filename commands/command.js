const Discord = require('discord.js');
const mUtil = require('../util/messageUtilities.js');

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
  new Command("help", showCommands, "Shows list of all the commands.")
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

module.exports = {CommandList, PREFIX}
