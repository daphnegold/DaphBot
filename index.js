const Discord = require('discord.js');
var fp = require('lodash-fp');

const client = new Discord.Client();

require('dotenv').config()
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const PREFIX = '!';
const hasPrefix = fp.startsWith(PREFIX);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Ready Freddy!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase().match(/senpai/)) {
    msg.channel.send('<3');
  }
});

client.on('message', msg => {
  const content = msg.content;

  if (!hasPrefix(content)) return;

  let args = content.substring(PREFIX.length).split(' ');

  if (fp.isEqual(fp.head(args), 'startraid')) {
    msg.reply('what raid would you like to start?')
  }
});

client.login(AUTH_TOKEN);
