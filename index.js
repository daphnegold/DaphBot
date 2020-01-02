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
    const collector = msg.channel.createMessageCollector(filter, { maxMatches: 1, time: 10000 });

    msg.channel.send('What raid would you like to start?');

    collector.on('collect', m => {
      msg.channel.send(`Creating raid for ${m.content}! What are the rules for this raid?`)
        .then(() => {
          msg.channel.awaitMessages(filter, { maxMatches: 1, time: 10000 })
            .then(collected => {
              msg.channel.send(`Cool. The rules are ${collected.first()}.`)
            })
        });

        // .then((msg) => {
        //   msg.react("👍")
        //   msg.react("👎")
        //   message.pin()
        //   message.delete()
        // }).catch(function() {
        //   //Something
        // });

        // const filter = (reaction, user) => {
        //   return reaction.emoji.name === '👍' && user.id === message.author.id;
        // };

        // msg.awaitReactions(filter, { max: 1 })
        //   .then(collected => msg.channel.send('Alright, what are the rules?'));
    });

    // collector.on('end', m => {
    //   msg.channel.send('Would you like to create rules for this raid?');
    // });
  }
});

client.login(AUTH_TOKEN);
