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
  if (!hasPrefix(msg.content)) return;

  let args = msg.content.substring(PREFIX.length).split(' ');

  if (fp.isEqual(fp.head(args), 'startraid')) {
    const filter = m => fp.isEqual(m.author.id, msg.author.id);
    const collector = msg.channel.createMessageCollector(filter, { time: 10000, maxMatches: 1 });

    msg.channel.send('What raid would you like to start?');

    collector.on('collect', m => {
      msg.channel.send(`Created raid for ${m.content}!`);
    });
  }
});

client.login(AUTH_TOKEN);
