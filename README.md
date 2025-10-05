# Mario Platformer Multiplayer

A minimal 2-player online adventure platformer game inspired by Super Mario Bros Deluxe, built with Phaser 3 and Socket.io.

## Features

- **2-Player Online Co-op**: Two players can connect and play together in real-time
- **Retro Platformer Gameplay**: Mario-style physics with running, jumping, and attacking
- **Multiple Weapons**: Dagger (melee), Bow (ranged), and Shuriken (throwable)
- **Power-ups**: Speed boost, shield, and double jump abilities
- **Procedural Graphics**: All sprites are generated procedurally using HTML5 Canvas
- **Retro Audio**: Chiptune background music and sound effects using Web Audio API
- **Enemy AI**: Simple patrolling blob enemies
- **Health System**: Players have health and lives

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open the game:**
   - Open your browser and go to `http://localhost:3000`
   - Open another browser tab/window to `http://localhost:3000` for the second player
   - Or share the URL with a friend to play together!

### Controls

- **Movement**: WASD or Arrow Keys
- **Jump**: Space or W/Up Arrow
- **Attack**: X key
- **Change Weapon**: C key
- **Toggle Music**: Click the music button

## Game Mechanics

### Player Physics
- Mario-style jump physics with momentum
- Ground collision detection
- Wall collision and world boundaries
- Smooth movement with acceleration/deceleration

### Multiplayer Synchronization
- Real-time position updates
- Attack synchronization
- Power-up collection
- Health and lives tracking
- Enemy state synchronization

### Weapons
1. **Dagger**: Close-range melee attack
2. **Bow**: Ranged projectile attack
3. **Shuriken**: Throwable projectile

### Power-ups
- **Speed Boost**: Increases movement speed temporarily
- **Shield**: Provides temporary invincibility
- **Double Jump**: Allows an extra jump in mid-air

## Project Structure

```
mario-platformer-game/
├── server.js              # WebSocket server
├── package.json           # Dependencies
├── public/
│   ├── index.html         # Game entry point
│   └── js/
│       ├── game.js       # Main game logic (Phaser 3)
│       └── audio.js      # Audio system
└── README.md             # This file
```

## How to Expand the Game

### Adding New Levels

1. **Modify the level data in `server.js`:**
   ```javascript
   // In initializeLevel() function
   gameState.level = {
     width: 2000,  // Increase level width
     height: 600
   };
   ```

2. **Add more platforms in `public/js/game.js`:**
   ```javascript
   // In create() function, add more platforms
   platforms.create(1600, 300, 'platform');
   platforms.create(1800, 200, 'platform');
   ```

### Adding New Weapons

1. **Add weapon to the weapons array:**
   ```javascript
   let weapons = ['dagger', 'bow', 'shuriken', 'bomb'];
   ```

2. **Implement weapon logic in the `attack()` function:**
   ```javascript
   function attack() {
     switch(weapons[currentWeapon]) {
       case 'bomb':
         // Create explosive projectile
         break;
       // ... other weapons
     }
   }
   ```

### Adding New Enemies

1. **Add enemy types in `server.js`:**
   ```javascript
   gameState.enemies.push({
     id: 'enemy4',
     x: 1500,
     y: 400,
     type: 'flying',
     direction: 1,
     speed: 30
   });
   ```

2. **Implement enemy AI in the game loop:**
   ```javascript
   // In server.js game loop
   gameState.enemies.forEach(enemy => {
     if (enemy.type === 'flying') {
       // Flying enemy AI
       enemy.y += Math.sin(Date.now() * 0.003) * 2;
     }
   });
   ```

### Adding New Power-ups

1. **Add power-up types:**
   ```javascript
   gameState.powerups.push({
     id: 'powerup4',
     x: 600,
     y: 200,
     type: 'invisibility',
     collected: false
   });
   ```

2. **Implement power-up effects in `public/js/game.js`:**
   ```javascript
   function applyPowerup(type) {
     switch(type) {
       case 'invisibility':
         player.setAlpha(0.5);
         setTimeout(() => player.setAlpha(1), 5000);
         break;
     }
   }
   ```

### Adding Sound Effects

1. **Add new sound methods in `public/js/audio.js`:**
   ```javascript
   playExplosion() {
     this.playTone(100, 0.5, 'sawtooth');
   }
   ```

2. **Call sounds in game events:**
   ```javascript
   // In attack function
   window.audioManager.playAttack();
   ```

### Adding More Visual Effects

1. **Create new procedural textures:**
   ```javascript
   function createExplosionTexture() {
     const canvas = document.createElement('canvas');
     // ... create explosion sprite
     return canvas;
   }
   ```

2. **Add particle effects:**
   ```javascript
   function createExplosion(x, y) {
     const particles = this.add.particles(x, y, 'particle', {
       speed: { min: 50, max: 100 },
       lifespan: 1000,
       quantity: 20
     });
   }
   ```

## Development Tips

### Testing Multiplayer
- Open multiple browser tabs to test multiplayer locally
- Use browser developer tools to monitor WebSocket connections
- Test with different network conditions

### Performance Optimization
- Limit update frequency to 60fps
- Use object pooling for frequently created/destroyed objects
- Optimize collision detection for large numbers of objects

### Adding Persistence
- Store player progress in a database
- Implement save/load functionality
- Add player accounts and leaderboards

## Troubleshooting

### Common Issues

1. **"Cannot connect to server"**
   - Make sure the server is running (`npm start`)
   - Check that port 3000 is not blocked
   - Try refreshing the browser

2. **"Audio not working"**
   - Modern browsers require user interaction before playing audio
   - Click the music button to enable audio
   - Check browser console for audio errors

3. **"Players not syncing"**
   - Check browser console for WebSocket errors
   - Ensure both players are connected to the same server
   - Try refreshing both browser windows

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

This will automatically restart the server when you make changes to the code.

## License

MIT License - Feel free to use this code for your own projects!
