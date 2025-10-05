// Simple test version without strategy pattern
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
        create: create,
        update: update
    }
};

let player;
let cursors;
let keys;
let gameScene;
let enemies = [];
let enemySpawnTimer = 0;
let ground;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting simple test game...');
    const game = new Phaser.Game(config);
});

function create() {
    console.log('Creating simple test game...');
    gameScene = this;
    
    // Create player
    player = this.physics.add.sprite(100, 500, null);
    player.setDisplaySize(32, 48);
    player.setTint(0xFF0000);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    
    // Create ground
    ground = this.physics.add.staticGroup();
    for (let x = 0; x < 3000; x += 32) {
        const block = this.add.rectangle(x, 568, 32, 32, 0x8B4513);
        ground.add(block);
    }
    
    // Add collisions
    this.physics.add.collider(player, ground);
    
    // Setup controls
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,A,S,D,SPACE');
    
    // Camera following
    this.cameras.main.setBounds(0, 0, 3000, 600);
    this.cameras.main.startFollow(player);
    this.cameras.main.setDeadzone(100, 100);
    
    console.log('Simple test game created!');
}

function update() {
    if (!player) return;
    
    // Movement
    if (cursors.left.isDown || keys.A.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown || keys.D.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }
    
    // Jump
    if ((cursors.up.isDown || keys.W.isDown || keys.SPACE.isDown) && player.body.touching.down) {
        player.setVelocityY(-600);
    }
    
    // Simple enemy spawning
    enemySpawnTimer++;
    if (enemySpawnTimer >= 1800) { // 30 seconds
        spawnSimpleEnemy();
        enemySpawnTimer = 0;
    }
    
    // Update simple enemies
    updateSimpleEnemies();
}

function spawnSimpleEnemy() {
    console.log('Simple enemy spawning!');
    
    const spawnX = player.x + 400 + Math.random() * 200;
    const spawnY = 500;
    
    const enemy = gameScene.physics.add.sprite(spawnX, spawnY, null);
    enemy.setDisplaySize(24, 32);
    enemy.setTint(0x8B4513);
    enemy.setBounce(0.1);
    enemy.body.setSize(24, 32);
    enemy.setCollideWorldBounds(false);
    enemy.speed = 50;
    
    gameScene.physics.add.collider(enemy, ground);
    enemies.push(enemy);
    
    console.log('Simple enemy spawned at', spawnX, spawnY);
}

function updateSimpleEnemies() {
    enemies.forEach((enemy, index) => {
        if (enemy && enemy.active) {
            // Simple movement towards player
            const direction = player.x - enemy.x;
            const distance = Math.abs(direction);
            
            if (distance > 10) {
                enemy.setVelocityX(direction > 0 ? enemy.speed : -enemy.speed);
            } else {
                enemy.setVelocityX(0);
            }
            
            // Remove enemies that are too far behind
            if (enemy.x < player.x - 500) {
                enemy.destroy();
                enemies.splice(index, 1);
            }
        }
    });
}
