const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'RealMadrid007.aternos.me', // your Aternos address
  port: 55896,
  username: '_Z_O_R_',             // Bot name in-game
  version: '1.21.4',              // Explicitly specify version
  auth: 'offline'                 // Use 'offline' if server is cracked
});

bot.once('spawn', () => {
  console.log('✅ AFK Bot connected to server!');
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 400);
  }, 60 * 1000);
});

bot.on('error', err => console.error('❌ Bot error:', err));
bot.on('end', () => {
  console.log('🔄 Bot disconnected, restarting in 5s...');
  setTimeout(() => process.exit(0), 5000);
});
