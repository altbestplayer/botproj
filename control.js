// bot.js
const mineflayer = require('mineflayer');

const options = {
  host: 'RealMadrid007.aternos.me',
  port: 55896,
  username: 'ZORbot',  // simple username, no special chars
  version: '1.21.4',
  auth: 'offline',     // offline mode auth for cracked servers
};

let bot;

function createBot() {
  console.log('Starting bot...');
  bot = mineflayer.createBot(options);

  bot.on('login', () => {
    console.log(`Logged in as ${bot.username}`);
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the world!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`<${username}> ${message}`);

    if (message === 'hi') {
      bot.chat(`Hello ${username}!`);
    }
  });

  bot.on('error', (err) => {
    console.error('Bot error:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });
}

createBot();
