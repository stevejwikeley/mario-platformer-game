// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Global variables
let socket;
let gameState = {
    players: {},
    enemies: [],
    powerups: [],
    level: { width: 1600, height: 600 }
};
let playerId;
let player;
let otherPlayers = {};
let enemies = {};
let powerups = {};
let platforms;
let cursors;
let keys;
let currentWeapon = 0;
let weapons = ['dagger', 'bow', 'shuriken'];
let lastUpdate = 0;

// Initialize game
const game = new Phaser.Game(config);

function preload() {
    // Create procedural graphics
    this.load.image('sky', createSkyTexture());
    this.load.image('ground', createGroundTexture());
    this.load.image('platform', createPlatformTexture());
    this.load.image('player', createPlayerTexture());
    this.load.image('enemy', createEnemyTexture());
    this.load.image('powerup', createPowerupTexture());
    this.load.image('goal', createGoalTexture());
}

function create() {
    // Connect to server
    socket = io();
    
    // Create background
    this.add.tileSprite(0, 0, 1600, 600, 'sky');
    
    // Create level platforms
    platforms = this.physics.add.staticGroup();
    
    // Ground
    for (let x = 0; x < 1600; x += 32) {
        platforms.create(x, 568, 'ground');
    }
    
    // Floating platforms
    platforms.create(200, 450, 'platform');
    platforms.create(400, 350, 'platform');
    platforms.create(600, 250, 'platform');
    platforms.create(800, 400, 'platform');
    platforms.create(1000, 300, 'platform');
    platforms.create(1200, 200, 'platform');
    platforms.create(1400, 500, 'platform');
    
    // Goal
    platforms.create(1500, 500, 'goal');
    
    // Setup input
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,S,A,D,SPACE,X,C');
    
    // Socket event listeners
    socket.on('gameState', (state) => {
        gameState = state;
        playerId = socket.id;
        createPlayer();
        createOtherPlayers();
        createEnemies();
        createPowerups();
    });
    
    socket.on('playerJoined', (playerData) => {
        createOtherPlayer(playerData);
    });
    
    socket.on('playerMoved', (data) => {
        if (otherPlayers[data.id]) {
            otherPlayers[data.id].setPosition(data.x, data.y);
            otherPlayers[data.id].setVelocity(data.vx, data.vy);
            otherPlayers[data.id].setFlipX(data.facing === -1);
        }
    });
    
    socket.on('playerAttacked', (data) => {
        if (otherPlayers[data.id]) {
            showAttackEffect(data.x, data.y, data.direction);
        }
    });
    
    socket.on('playerLeft', (id) => {
        if (otherPlayers[id]) {
            otherPlayers[id].destroy();
            delete otherPlayers[id];
        }
    });
    
    socket.on('enemiesUpdate', (enemiesData) => {
        enemiesData.forEach(enemyData => {
            if (enemies[enemyData.id]) {
                enemies[enemyData.id].setPosition(enemyData.x, enemyData.y);
            }
        });
    });
    
    socket.on('enemyDestroyed', (enemyId) => {
        if (enemies[enemyId]) {
            enemies[enemyId].destroy();
            delete enemies[enemyId];
        }
    });
    
    socket.on('powerupCollected', (data) => {
        if (powerups[data.powerupId]) {
            powerups[data.powerupId].destroy();
            delete powerups[data.powerupId];
        }
        showPowerupEffect(data.type);
    });
    
    socket.on('playerHealthUpdate', (data) => {
        if (data.id === playerId) {
            document.getElementById('health').textContent = data.health;
            document.getElementById('lives').textContent = data.lives;
        }
    });
    
    socket.on('levelCompleted', (playerId) => {
        this.add.text(600, 300, 'Level Complete!', {
            fontSize: '48px',
            fill: '#00ff00'
        }).setOrigin(0.5);
    });
}

function update() {
    if (!player) return;
    
    const now = Date.now();
    if (now - lastUpdate < 16) return; // 60fps limit
    lastUpdate = now;
    
    // Player movement
    let vx = 0;
    let facing = player.flipX ? -1 : 1;
    
    if (cursors.left.isDown || keys.A.isDown) {
        vx = -200;
        facing = -1;
    } else if (cursors.right.isDown || keys.D.isDown) {
        vx = 200;
        facing = 1;
    }
    
    if ((cursors.up.isDown || keys.W.isDown) && player.body.touching.down) {
        player.setVelocityY(-400);
    }
    
    player.setVelocityX(vx);
    player.setFlipX(facing === -1);
    
    // Attack
    if (Phaser.Input.Keyboard.JustDown(keys.X)) {
        attack();
    }
    
    // Change weapon
    if (Phaser.Input.Keyboard.JustDown(keys.C)) {
        currentWeapon = (currentWeapon + 1) % weapons.length;
        document.getElementById('weapon').textContent = weapons[currentWeapon].charAt(0).toUpperCase() + weapons[currentWeapon].slice(1);
    }
    
    // Send position to server
    socket.emit('playerMove', {
        x: player.x,
        y: player.y,
        vx: player.body.velocity.x,
        vy: player.body.velocity.y,
        onGround: player.body.touching.down,
        facing: facing
    });
    
    // Camera follow
    this.cameras.main.setBounds(0, 0, 1600, 600);
    this.cameras.main.startFollow(player);
}

function createPlayer() {
    player = this.physics.add.sprite(100, 500, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(24, 32);
    
    // Collision with platforms
    this.physics.add.collider(player, platforms);
}

function createOtherPlayer(playerData) {
    const otherPlayer = this.physics.add.sprite(playerData.x, playerData.y, 'player');
    otherPlayer.setTint(0x00ff00); // Green tint for other players
    otherPlayer.setBounce(0.2);
    otherPlayer.body.setSize(24, 32);
    otherPlayers[playerData.id] = otherPlayer;
}

function createOtherPlayers() {
    Object.values(gameState.players).forEach(playerData => {
        if (playerData.id !== playerId) {
            createOtherPlayer(playerData);
        }
    });
}

function createEnemies() {
    gameState.enemies.forEach(enemyData => {
        const enemy = this.physics.add.sprite(enemyData.x, enemyData.y, 'enemy');
        enemy.setBounce(0.1);
        enemy.body.setSize(32, 32);
        enemies[enemyData.id] = enemy;
        
        // Collision with platforms
        this.physics.add.collider(enemy, platforms);
        
        // Enemy-player collision
        this.physics.add.overlap(player, enemy, () => {
            socket.emit('playerDamaged', 20);
        });
    });
}

function createPowerups() {
    gameState.powerups.forEach(powerupData => {
        if (!powerupData.collected) {
            const powerup = this.physics.add.sprite(powerupData.x, powerupData.y, 'powerup');
            powerup.body.setSize(16, 16);
            powerups[powerupData.id] = powerup;
            
            // Powerup collection
            this.physics.add.overlap(player, powerup, () => {
                socket.emit('collectPowerup', powerupData.id);
            });
        }
    });
}

function attack() {
    const direction = player.flipX ? -1 : 1;
    const attackX = player.x + (direction * 40);
    const attackY = player.y;
    
    socket.emit('playerAttack', {
        weapon: weapons[currentWeapon],
        x: attackX,
        y: attackY,
        direction: direction
    });
    
    showAttackEffect(attackX, attackY, direction);
    
    // Check for enemy hits
    Object.entries(enemies).forEach(([id, enemy]) => {
        const distance = Phaser.Math.Distance.Between(attackX, attackY, enemy.x, enemy.y);
        if (distance < 50) {
            socket.emit('damageEnemy', id);
        }
    });
}

function showAttackEffect(x, y, direction) {
    const effect = this.add.circle(x, y, 20, 0xff0000, 0.5);
    this.tweens.add({
        targets: effect,
        scaleX: 2,
        scaleY: 2,
        alpha: 0,
        duration: 200,
        onComplete: () => effect.destroy()
    });
}

function showPowerupEffect(type) {
    const colors = {
        speed: 0x00ff00,
        shield: 0x0000ff,
        doublejump: 0xff00ff
    };
    
    const effect = this.add.circle(player.x, player.y - 50, 30, colors[type], 0.8);
    this.tweens.add({
        targets: effect,
        y: player.y - 100,
        alpha: 0,
        duration: 1000,
        onComplete: () => effect.destroy()
    });
}

// Procedural texture creation functions
function createSkyTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 32);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    return canvas;
}

function createGroundTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = '#654321';
    ctx.fillRect(0, 0, 32, 4);
    
    return canvas;
}

function createPlatformTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, 128, 32);
    ctx.fillStyle = '#654321';
    ctx.fillRect(0, 0, 128, 4);
    
    return canvas;
}

function createPlayerTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');
    
    // Body
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(12, 8, 8, 24);
    
    // Head
    ctx.fillStyle = '#FFE66D';
    ctx.fillRect(10, 4, 12, 12);
    
    // Arms
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(8, 12, 4, 8);
    ctx.fillRect(20, 12, 4, 8);
    
    // Legs
    ctx.fillStyle = '#4ECDC4';
    ctx.fillRect(10, 32, 4, 12);
    ctx.fillRect(18, 32, 4, 12);
    
    return canvas;
}

function createEnemyTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Blob shape
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(10, 10, 4, 4);
    ctx.fillRect(18, 10, 4, 4);
    
    return canvas;
}

function createPowerupTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(2, 2, 12, 12);
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(4, 4, 8, 8);
    
    return canvas;
}

function createGoalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Flag pole
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(14, 0, 4, 64);
    
    // Flag
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(18, 8, 12, 8);
    
    return canvas;
}
