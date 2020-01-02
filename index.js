const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config()
const AUTH_TOKEN = process.env.AUTH_TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! Ready Freddy!`);
});

client.on('message', msg => {
  if (msg.content === 'ping <3') {
    msg.reply('pong <3');
  }
});

client.login(AUTH_TOKEN);