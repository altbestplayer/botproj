const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'RealMadrid007.aternos.me',
  port: 55896,
  username: '_Z_O_R_',       // Updated username
  version: '1.21.4',
  auth: 'offline'            // Change to 'microsoft' if premium
});

bot.once('spawn', () => {
  console.log('✅ Bot connected. Searching for nearby doors...');

  setInterval(() => {
    const door = bot.findBlock({
      matching: block => block.name.includes('door'),
      maxDistance: 6
    });

    if (door) {
      bot.activateBlock(door);
      console.log('🚪 Door toggled at', door.position.toString());
    } else {
      console.log('❌ No door found nearby!');
    }
  }, 10000); // every 10 seconds
});

bot.on('error', err => console.log('❌ Bot Error:', err));
bot.on('end', () => {
  console.log('🔁 Bot disconnected. Restarting in 5 seconds...');
  setTimeout(() => process.exit(0), 5000);
});
