const Discord = require('discord.js');
const fp = require('lodash-fp');

require('dotenv').config()

const client = new Discord.Client();
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

client.on('message', async msg => {
  if (!hasPrefix(msg.content)) return;

  let args = msg.content.substring(PREFIX.length).split(' ');

  if (fp.isEqual(fp.head(args), 'startraid')) {
    const filter = m => fp.isEqual(m.author.id, msg.author.id);
    const collector = msg.channel.createMessageCollector(filter, { maxMatches: 1, time: 10000 });

    await msg.channel.send('What raid would you like to start?');

    collector.on('collect', async m => {
      const raidName = m.content;
      await msg.channel.send(`Creating raid for ${raidName}! What are the rules for this raid?`);

      const collected = await msg.channel.awaitMessages(filter, { maxMatches: 1, time: 10000 });
      const raidRules = collected.first();
      const message = await msg.channel.send(`Hey, ${collected.first().author} is hosting ${raidName}. The rules are as follows: ${raidRules}`);

      message.pin();
    });
  }
});

client.login(AUTH_TOKEN);
