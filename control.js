// control.js
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { GoalFollow } = require('mineflayer-pathfinder').goals;

const bot = mineflayer.createBot({
  host: 'RealMadrid007.aternos.me',
  port: 55896,
  username: 'nooboobsbot',    // Use your offline mode username here
  version: '1.21.4',
  auth: 'offline',
});

bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  console.log('✅ Control bot connected!');

  bot.pathfinder.setGoal(null);

  // Door toggling to keep connection alive (optional)
  setInterval(() => {
    const door = bot.findBlock({
      matching: block => block.name.includes('door'),
      maxDistance: 6,
    });

    if (door) {
      bot.activateBlock(door);
      console.log('🚪 Door toggled at', door.position.toString());
    }
  }, 10000);
});

// Listen for chat commands
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // ignore own messages

  if (message === 'come') {
    const player = bot.players[username];
    if (player && player.entity) {
      bot.pathfinder.setGoal(new GoalFollow(player.entity, 1), true);
      bot.chat(`Coming to you, ${username}!`);
    } else {
      bot.chat(`I can't see you, ${username}!`);
    }
  }

  if (message === 'stop') {
    bot.pathfinder.setGoal(null);
    bot.chat('Stopping movement.');
  }
});

bot.on('error', err => console.log('❌ Control bot error:', err));
bot.on('end', () => {
  console.log('🔁 Control bot disconnected, restarting...');
  setTimeout(() => process.exit(0), 5000);
});
