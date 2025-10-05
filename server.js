const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Game state
const gameState = {
  players: {},
  enemies: [],
  powerups: [],
  level: {
    width: 1600,
    height: 600
  }
};

// Initialize demo level
function initializeLevel() {
  // Add some demo enemies
  gameState.enemies = [
    { id: 'enemy1', x: 300, y: 500, type: 'blob', direction: 1, speed: 20 },
    { id: 'enemy2', x: 800, y: 400, type: 'blob', direction: -1, speed: 15 },
    { id: 'enemy3', x: 1200, y: 300, type: 'blob', direction: 1, speed: 25 }
  ];
  
  // Add some demo powerups
  gameState.powerups = [
    { id: 'powerup1', x: 400, y: 450, type: 'speed', collected: false },
    { id: 'powerup2', x: 700, y: 350, type: 'shield', collected: false },
    { id: 'powerup3', x: 1000, y: 250, type: 'doublejump', collected: false }
  ];
}

// Initialize level on server start
initializeLevel();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  // Assign player ID and initial position
  const playerId = socket.id;
  gameState.players[playerId] = {
    id: playerId,
    x: 100,
    y: 500,
    vx: 0,
    vy: 0,
    onGround: false,
    health: 100,
    lives: 3,
    weapon: 'dagger',
    powerups: [],
    facing: 1
  };
  
  // Send current game state to new player
  socket.emit('gameState', gameState);
  
  // Broadcast new player to all other players
  socket.broadcast.emit('playerJoined', gameState.players[playerId]);
  
  // Handle player movement
  socket.on('playerMove', (data) => {
    if (gameState.players[playerId]) {
      gameState.players[playerId].x = data.x;
      gameState.players[playerId].y = data.y;
      gameState.players[playerId].vx = data.vx;
      gameState.players[playerId].vy = data.vy;
      gameState.players[playerId].onGround = data.onGround;
      gameState.players[playerId].facing = data.facing;
      
      // Broadcast to all other players
      socket.broadcast.emit('playerMoved', {
        id: playerId,
        x: data.x,
        y: data.y,
        vx: data.vx,
        vy: data.vy,
        onGround: data.onGround,
        facing: data.facing
      });
    }
  });
  
  // Handle player attacks
  socket.on('playerAttack', (data) => {
    socket.broadcast.emit('playerAttacked', {
      id: playerId,
      weapon: data.weapon,
      x: data.x,
      y: data.y,
      direction: data.direction
    });
  });
  
  // Handle powerup collection
  socket.on('collectPowerup', (powerupId) => {
    const powerup = gameState.powerups.find(p => p.id === powerupId);
    if (powerup && !powerup.collected) {
      powerup.collected = true;
      gameState.players[playerId].powerups.push(powerup.type);
      
      // Broadcast to all players
      io.emit('powerupCollected', {
        powerupId: powerupId,
        playerId: playerId,
        type: powerup.type
      });
    }
  });
  
  // Handle enemy damage
  socket.on('damageEnemy', (enemyId) => {
    const enemy = gameState.enemies.find(e => e.id === enemyId);
    if (enemy) {
      // Remove enemy
      gameState.enemies = gameState.enemies.filter(e => e.id !== enemyId);
      io.emit('enemyDestroyed', enemyId);
    }
  });
  
  // Handle player damage
  socket.on('playerDamaged', (damage) => {
    if (gameState.players[playerId]) {
      gameState.players[playerId].health -= damage;
      if (gameState.players[playerId].health <= 0) {
        gameState.players[playerId].lives--;
        gameState.players[playerId].health = 100;
        gameState.players[playerId].x = 100;
        gameState.players[playerId].y = 500;
      }
      
      io.emit('playerHealthUpdate', {
        id: playerId,
        health: gameState.players[playerId].health,
        lives: gameState.players[playerId].lives
      });
    }
  });
  
  // Handle level completion
  socket.on('levelComplete', () => {
    io.emit('levelCompleted', playerId);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    delete gameState.players[playerId];
    socket.broadcast.emit('playerLeft', playerId);
  });
});

// Game loop for enemy AI
setInterval(() => {
  gameState.enemies.forEach(enemy => {
    // Simple patrolling AI
    enemy.x += enemy.direction * enemy.speed * 0.016; // 60fps
    
    // Reverse direction at boundaries
    if (enemy.x <= 50 || enemy.x >= gameState.level.width - 50) {
      enemy.direction *= -1;
    }
  });
  
  // Broadcast enemy positions
  io.emit('enemiesUpdate', gameState.enemies);
}, 16); // ~60fps

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to play!`);
});
