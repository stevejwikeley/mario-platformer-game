// Simple working game with faster, tougher enemies using strategy pattern

// WEAPON SYSTEM IMPLEMENTATION
class Weapon {
    constructor(name, damage, range, cooldown, color, effectType) {
        this.name = name;
        this.damage = damage;
        this.range = range;
        this.cooldown = cooldown;
        this.color = color;
        this.effectType = effectType;
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Override in subclasses
    }
}

class Sword extends Weapon {
    constructor() {
        super('Sword', 1, 60, 20, 0x00FF00, 'slash');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Slash effect
        const slash = scene.add.rectangle(x, y, 40, 20, this.color, 0.8);
        scene.tweens.add({
            targets: slash,
            rotation: Math.PI / 4,
            alpha: 0,
            duration: 200,
            onComplete: () => slash.destroy()
        });
    }
}

class Hammer extends Weapon {
    constructor() {
        super('Hammer', 2, 50, 40, 0x8B4513, 'slam');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Hammer slam effect
        const hammer = scene.add.circle(x, y, 30, this.color, 0.9);
        scene.tweens.add({
            targets: hammer,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => hammer.destroy()
        });
        
        // Shockwave
        const shockwave = scene.add.circle(x, y, 20, 0xFFFFFF, 0.6);
        scene.tweens.add({
            targets: shockwave,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 400,
            onComplete: () => shockwave.destroy()
        });
    }
}

class Spear extends Weapon {
    constructor() {
        super('Spear', 1, 80, 15, 0x4169E1, 'thrust');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Spear thrust effect
        const spear = scene.add.rectangle(x + direction * 20, y, 60, 8, this.color, 0.9);
        scene.tweens.add({
            targets: spear,
            x: x + direction * 40,
            alpha: 0,
            duration: 150,
            onComplete: () => spear.destroy()
        });
    }
}

class Bow extends Weapon {
    constructor() {
        super('Bow', 1, 100, 30, 0xFFD700, 'projectile');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Arrow projectile
        const arrow = scene.add.rectangle(x + direction * 10, y, 20, 4, this.color, 0.9);
        scene.tweens.add({
            targets: arrow,
            x: x + direction * 120,
            alpha: 0,
            duration: 400,
            onComplete: () => arrow.destroy()
        });
    }
}

class Magic extends Weapon {
    constructor() {
        super('Magic', 2, 70, 25, 0xFF00FF, 'spell');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Magic spell effect
        const spell = scene.add.circle(x, y, 25, this.color, 0.8);
        scene.tweens.add({
            targets: spell,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 250,
            onComplete: () => spell.destroy()
        });
        
        // Magic particles
        for (let i = 0; i < 5; i++) {
            const particle = scene.add.circle(
                x + (Math.random() - 0.5) * 40, 
                y + (Math.random() - 0.5) * 40, 
                3, 
                this.color, 
                0.9
            );
            scene.tweens.add({
                targets: particle,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 300,
                onComplete: () => particle.destroy()
            });
        }
    }
}

// NEW ADVANCED WEAPONS
class Lightning extends Weapon {
    constructor() {
        super('Lightning', 3, 90, 35, 0xFFFF00, 'lightning');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Lightning bolt effect
        const lightning = scene.add.rectangle(x + direction * 20, y, 8, 80, this.color, 0.9);
        scene.tweens.add({
            targets: lightning,
            x: x + direction * 100,
            alpha: 0,
            duration: 150,
            onComplete: () => lightning.destroy()
        });
        
        // Lightning sparks
        for (let i = 0; i < 3; i++) {
            const spark = scene.add.circle(
                x + direction * (20 + i * 30), 
                y + (Math.random() - 0.5) * 20, 
                4, 
                this.color, 
                0.8
            );
            scene.tweens.add({
                targets: spark,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 200,
                onComplete: () => spark.destroy()
            });
        }
    }
}

class IceBlast extends Weapon {
    constructor() {
        super('Ice Blast', 2, 60, 20, 0x00FFFF, 'ice');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Ice blast effect
        const ice = scene.add.circle(x, y, 30, this.color, 0.8);
        scene.tweens.add({
            targets: ice,
            scaleX: 1.8,
            scaleY: 1.8,
            alpha: 0,
            duration: 300,
            onComplete: () => ice.destroy()
        });
        
        // Ice crystals
        for (let i = 0; i < 6; i++) {
            const crystal = scene.add.rectangle(
                x + (Math.random() - 0.5) * 60, 
                y + (Math.random() - 0.5) * 60, 
                6, 
                12, 
                this.color, 
                0.7
            );
            scene.tweens.add({
                targets: crystal,
                rotation: Math.PI,
                alpha: 0,
                duration: 400,
                onComplete: () => crystal.destroy()
            });
        }
    }
}

class FireBlade extends Weapon {
    constructor() {
        super('Fire Blade', 2, 70, 15, 0xFF4500, 'fire');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Fire blade slash
        const fire = scene.add.rectangle(x, y, 50, 15, this.color, 0.9);
        scene.tweens.add({
            targets: fire,
            rotation: Math.PI / 3,
            alpha: 0,
            duration: 200,
            onComplete: () => fire.destroy()
        });
        
        // Fire particles
        for (let i = 0; i < 8; i++) {
            const flame = scene.add.circle(
                x + (Math.random() - 0.5) * 50, 
                y + (Math.random() - 0.5) * 30, 
                3, 
                this.color, 
                0.8
            );
            scene.tweens.add({
                targets: flame,
                y: flame.y - 20,
                alpha: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 300,
                onComplete: () => flame.destroy()
            });
        }
    }
}

class ShadowDagger extends Weapon {
    constructor() {
        super('Shadow Dagger', 1, 50, 10, 0x4B0082, 'shadow');
    }
    
    createAttackEffect(scene, x, y, direction) {
        // Shadow strike
        const shadow = scene.add.rectangle(x + direction * 15, y, 30, 6, this.color, 0.8);
        scene.tweens.add({
            targets: shadow,
            x: x + direction * 60,
            alpha: 0,
            duration: 100,
            onComplete: () => shadow.destroy()
        });
        
        // Shadow trail
        const trail = scene.add.rectangle(x, y, 40, 4, this.color, 0.6);
        scene.tweens.add({
            targets: trail,
            alpha: 0,
            duration: 150,
            onComplete: () => trail.destroy()
        });
    }
}

// ENEMY STRATEGY PATTERN IMPLEMENTATION
class EnemyStrategy {
    constructor(enemy, player, ground) {
        this.enemy = enemy;
        this.player = player;
        this.ground = ground;
        this.strategyTimer = 0;
        this.lastHealth = enemy.health;
        this.lastStrategySwitch = 0; // Prevent too frequent switching
    }
    
    update() {
        // Override in subclasses
        this.strategyTimer++;
        this.checkStrategySwitch();
    }
    
    getDistanceToPlayer() {
        return Math.abs(this.player.x - this.enemy.x);
    }
    
    getDirectionToPlayer() {
        return this.player.x - this.enemy.x;
    }
    
    canJump() {
        return this.enemy.jumpCooldown <= 0 && this.enemy.body.touching.down;
    }
    
    isGroundAhead(distance) {
        const direction = this.getDirectionToPlayer();
        const aheadX = this.enemy.x + (direction > 0 ? distance : -distance);
        const aheadY = this.enemy.y;
        
        let groundAhead = false;
        this.ground.children.entries.forEach(block => {
            if (Math.abs(block.x - aheadX) < 60 && Math.abs(block.y - aheadY) < 60) {
                groundAhead = true;
            }
        });
        return groundAhead;
    }
    
    checkStrategySwitch() {
        const distance = this.getDistanceToPlayer();
        
        // Prevent too frequent strategy switching (minimum 2 seconds between switches)
        if (this.strategyTimer - this.lastStrategySwitch < 120) {
            return;
        }
        
        // Switch to Kamikaze if health is low
        if (this.enemy.health <= 1 && this.constructor !== KamikazeStrategy) {
            this.switchStrategy(KamikazeStrategy);
            return;
        }
        
        // Switch to Defensive if taking damage
        if (this.enemy.health < this.lastHealth && this.constructor !== DefensiveStrategy) {
            this.switchStrategy(DefensiveStrategy);
            this.lastHealth = this.enemy.health;
            return;
        }
        
        // Switch to Aggressive if player is very close and we're not already aggressive
        if (distance < 50 && this.constructor !== AggressiveStrategy && this.constructor !== KamikazeStrategy) {
            this.switchStrategy(AggressiveStrategy);
            return;
        }
        
        // Switch to Patrolling if player is very far and we're not already patrolling
        if (distance > 300 && this.constructor !== PatrollingStrategy) {
            this.switchStrategy(PatrollingStrategy);
            return;
        }
        
        // Random strategy switch every 20 seconds (1200 frames) with lower probability
        if (this.strategyTimer > 1200 && Math.random() < 0.05) {
            const strategies = [
                AggressiveStrategy, 
                DefensiveStrategy, 
                PatrollingStrategy,
                SniperStrategy,
                FlankerStrategy,
                GuardianStrategy
            ];
            const newStrategy = strategies[Math.floor(Math.random() * strategies.length)];
            if (newStrategy !== this.constructor) {
                this.switchStrategy(newStrategy);
                this.strategyTimer = 0; // Reset timer after switching
            }
        }
    }
    
    switchStrategy(NewStrategyClass) {
        // console.log('Enemy switching from', this.constructor.name, 'to', NewStrategyClass.name);
        this.lastStrategySwitch = this.strategyTimer;
        
        // Create strategy switch visual effect (simplified to prevent performance issues)
        // const switchEffect = this.enemy.scene.add.circle(this.enemy.x, this.enemy.y, 40, 0xFFFFFF, 0.8);
        // this.enemy.scene.tweens.add({
        //     targets: switchEffect,
        //     scaleX: 2,
        //     scaleY: 2,
        //     alpha: 0,
        //     duration: 300,
        //     onComplete: () => {
        //         switchEffect.destroy();
        //     }
        // });
        
        this.enemy.strategy = new NewStrategyClass(this.enemy, this.player, this.ground);
        this.enemy.strategy.lastStrategySwitch = this.strategyTimer;
        
        // Update visual indicator
        if (NewStrategyClass === AggressiveStrategy) {
            this.enemy.setTint(0xFF4500); // Orange-red for aggressive
        } else if (NewStrategyClass === DefensiveStrategy) {
            this.enemy.setTint(0x4169E1); // Blue for defensive
        } else if (NewStrategyClass === PatrollingStrategy) {
            this.enemy.setTint(0x32CD32); // Green for patrolling
        } else if (NewStrategyClass === KamikazeStrategy) {
            this.enemy.setTint(0xDC143C); // Crimson for kamikaze
        } else if (NewStrategyClass === SniperStrategy) {
            this.enemy.setTint(0x00FFFF); // Cyan for sniper
        } else if (NewStrategyClass === FlankerStrategy) {
            this.enemy.setTint(0xFFD700); // Gold for flanker
        } else if (NewStrategyClass === GuardianStrategy) {
            this.enemy.setTint(0x800080); // Purple for guardian
        }
        
        // Update strategy text (temporarily disabled)
        // if (this.enemy.strategyText) {
        //     this.enemy.strategyText.setText(NewStrategyClass.name.replace('Strategy', ''));
        // }
    }
}

class AggressiveStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.attackTimer = 0;
        this.lastPlayerPosition = { x: player.x, y: player.y };
        this.predictionAccuracy = 0.7;
    }
    
    update() {
        super.update(); // Call parent update for strategy switching
        
        this.attackTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Enhanced pursuit with player prediction
        const predictedX = this.player.x + (this.player.body.velocity.x * 0.3);
        const predictedDistance = Math.abs(predictedX - this.enemy.x);
        
        // Adaptive speed based on distance and health
        let speedMultiplier = 1.2;
        if (distance > 200) speedMultiplier = 1.5; // Faster when far
        if (distance < 50) speedMultiplier = 0.8;  // Slower when close
        if (this.enemy.health <= 1) speedMultiplier = 1.8; // Desperate speed when low health
        
        // Smart movement with prediction
        if (predictedDistance > 15) {
            const moveDirection = predictedX > this.enemy.x ? 1 : -1;
            this.enemy.setVelocityX(moveDirection * this.enemy.speed * speedMultiplier);
        } else {
            this.enemy.setVelocityX(0);
        }
        
        // Enhanced jumping with multiple conditions
        if (this.canJump()) {
            const shouldJump = this.shouldJump(distance);
            if (shouldJump) {
                this.performJump(distance);
            }
        }
        
        // Aggressive attack pattern when very close
        if (distance < 30 && this.attackTimer > 60) {
            this.performCloseAttack();
            this.attackTimer = 0;
        }
    }
    
    shouldJump(distance) {
        // Jump to reach player above
        if (this.player.y < this.enemy.y - 30 && distance < 120) return true;
        
        // Jump to close distance
        if (distance < 100 && distance > 40 && Math.random() < 0.6) return true;
        
        // Jump to avoid getting cornered
        if (distance < 60 && this.isNearWall()) return true;
        
        // Desperate jump when low health
        if (this.enemy.health <= 1 && distance < 150 && Math.random() < 0.8) return true;
        
        return false;
    }
    
    performJump(distance) {
        let jumpPower = -500;
        if (distance < 50) jumpPower = -400; // Lower jump when close
        if (this.enemy.health <= 1) jumpPower = -650; // Higher jump when desperate
        
        this.enemy.setVelocityY(jumpPower);
        this.enemy.jumpCooldown = 35;
    }
    
    isNearWall() {
        const direction = this.getDirectionToPlayer();
        const checkX = this.enemy.x + (direction > 0 ? 50 : -50);
        return checkX < 100 || checkX > 2900; // Near world boundaries
    }
    
    performCloseAttack() {
        // Create aggressive attack effect
        const attackX = this.enemy.x;
        const attackY = this.enemy.y;
        
        const attackEffect = this.enemy.scene.add.circle(attackX, attackY, 40, 0xFF4500, 0.7);
        this.enemy.scene.tweens.add({
            targets: attackEffect,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 200,
            onComplete: () => attackEffect.destroy()
        });
        
        // Screen shake for aggressive attack
        this.enemy.scene.cameras.main.shake(100, 0.01);
    }
}

class DefensiveStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.retreatTimer = 0;
        this.optimalDistance = 120;
        this.defensivePosition = { x: enemy.x, y: enemy.y };
        this.areaControl = true;
    }
    
    update() {
        super.update(); // Call parent update for strategy switching
        
        this.retreatTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Smart defensive positioning
        this.updateDefensivePosition(distance, direction);
        
        // Tactical movement based on situation
        this.performTacticalMovement(distance, direction);
        
        // Defensive jumping with better decision making
        if (this.canJump()) {
            this.performDefensiveJump(distance);
        }
        
        // Area control - try to control strategic positions
        if (this.areaControl && distance > 150) {
            this.performAreaControl();
        }
    }
    
    updateDefensivePosition(distance, direction) {
        // Update optimal defensive position
        if (distance < 80) {
            this.optimalDistance = 140; // Increase safe distance when threatened
        } else if (distance > 200) {
            this.optimalDistance = 100; // Decrease when safe
        }
    }
    
    performTacticalMovement(distance, direction) {
        const speedMultiplier = this.enemy.health <= 1 ? 1.3 : 0.8; // Faster retreat when low health
        
        if (distance < this.optimalDistance) {
            // Tactical retreat with positioning
            const retreatDirection = this.getBestRetreatDirection(direction);
            this.enemy.setVelocityX(retreatDirection * this.enemy.speed * speedMultiplier);
        } else if (distance > this.optimalDistance + 50) {
            // Careful advance to maintain optimal distance
            const advanceDirection = direction > 0 ? 1 : -1;
            this.enemy.setVelocityX(advanceDirection * this.enemy.speed * 0.5);
        } else {
            // Hold position and strafe
            this.performStrafing(direction);
        }
    }
    
    getBestRetreatDirection(direction) {
        // Choose retreat direction based on environment
        const leftSpace = this.enemy.x - 100;
        const rightSpace = 3000 - this.enemy.x - 100;
        
        if (leftSpace > rightSpace) {
            return -1; // Retreat left
        } else if (rightSpace > leftSpace) {
            return 1; // Retreat right
        } else {
            return direction > 0 ? -1 : 1; // Retreat away from player
        }
    }
    
    performStrafing(direction) {
        // Side-to-side movement to avoid attacks
        if (this.retreatTimer % 60 < 30) {
            this.enemy.setVelocityX(this.enemy.speed * 0.3);
        } else {
            this.enemy.setVelocityX(-this.enemy.speed * 0.3);
        }
    }
    
    performDefensiveJump(distance) {
        // Escape jump when too close
        if (distance < 50 && this.player.y < this.enemy.y - 20) {
            const escapeDirection = this.getBestRetreatDirection(this.getDirectionToPlayer());
            this.enemy.setVelocityY(-450);
            this.enemy.setVelocityX(escapeDirection * this.enemy.speed * 0.5);
            this.enemy.jumpCooldown = 50;
        }
        // Platform jump for positioning
        else if (!this.isGroundAhead(100) && distance > 120) {
            this.enemy.setVelocityY(-400);
            this.enemy.jumpCooldown = 60;
        }
        // Defensive jump to higher ground
        else if (distance < 80 && this.player.y > this.enemy.y + 20) {
            this.enemy.setVelocityY(-500);
            this.enemy.jumpCooldown = 45;
        }
    }
    
    performAreaControl() {
        // Try to control strategic positions
        const strategicX = this.player.x + 100; // Position ahead of player
        const distanceToStrategic = Math.abs(strategicX - this.enemy.x);
        
        if (distanceToStrategic > 50) {
            const direction = strategicX > this.enemy.x ? 1 : -1;
            this.enemy.setVelocityX(direction * this.enemy.speed * 0.6);
        }
    }
}

class PatrollingStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.patrolDirection = Math.random() < 0.5 ? 1 : -1;
        this.patrolTimer = 0;
        this.startX = enemy.x;
        this.patrolPoints = [];
        this.currentPatrolTarget = 0;
        this.alertLevel = 0; // 0 = calm, 1 = suspicious, 2 = alert, 3 = engaged
        this.lastPlayerSighting = { x: player.x, y: player.y, time: 0 };
        this.setupPatrolRoute();
    }
    
    update() {
        super.update(); // Call parent update for strategy switching
        
        this.patrolTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Update alert level based on player proximity and behavior
        this.updateAlertLevel(distance);
        
        // Smart patrolling with different behaviors based on alert level
        if (this.alertLevel === 0) {
            this.performCalmPatrol();
        } else if (this.alertLevel === 1) {
            this.performSuspiciousPatrol();
        } else if (this.alertLevel === 2) {
            this.performAlertPatrol(distance, direction);
        } else {
            this.performEngagedPatrol(distance, direction);
        }
        
        // Enhanced jumping with alert-based behavior
        if (this.canJump()) {
            this.performPatrolJump(distance);
        }
    }
    
    setupPatrolRoute() {
        // Create patrol points around the starting position
        this.patrolPoints = [
            { x: this.startX - 150, y: this.enemy.y },
            { x: this.startX, y: this.enemy.y },
            { x: this.startX + 150, y: this.enemy.y }
        ];
    }
    
    updateAlertLevel(distance) {
        if (distance < 50) {
            this.alertLevel = 3; // Engaged
        } else if (distance < 100) {
            this.alertLevel = 2; // Alert
        } else if (distance < 200) {
            this.alertLevel = 1; // Suspicious
        } else {
            this.alertLevel = Math.max(0, this.alertLevel - 0.1); // Gradually calm down
        }
        
        // Update last player sighting
        if (distance < 300) {
            this.lastPlayerSighting = { x: this.player.x, y: this.player.y, time: this.patrolTimer };
        }
    }
    
    performCalmPatrol() {
        // Normal patrolling behavior
        this.enemy.setVelocityX(this.patrolDirection * this.enemy.speed * 0.6);
        
        // Change direction at patrol points or boundaries
        if (this.patrolTimer > 300 || Math.abs(this.enemy.x - this.startX) > 200) {
            this.patrolDirection *= -1;
            this.patrolTimer = 0;
            this.startX = this.enemy.x;
        }
    }
    
    performSuspiciousPatrol() {
        // Slower, more cautious movement
        this.enemy.setVelocityX(this.patrolDirection * this.enemy.speed * 0.4);
        
        // Look around more
        if (this.patrolTimer % 90 < 45) {
            this.enemy.setVelocityX(this.enemy.speed * 0.2);
        } else {
            this.enemy.setVelocityX(-this.enemy.speed * 0.2);
        }
    }
    
    performAlertPatrol(distance, direction) {
        // Move towards last known player position
        const targetX = this.lastPlayerSighting.x;
        const distanceToTarget = Math.abs(targetX - this.enemy.x);
        
        if (distanceToTarget > 30) {
            const moveDirection = targetX > this.enemy.x ? 1 : -1;
            this.enemy.setVelocityX(moveDirection * this.enemy.speed * 0.8);
        } else {
            // Search pattern when at last known position
            this.performSearchPattern();
        }
    }
    
    performEngagedPatrol(distance, direction) {
        // Direct engagement with player
        if (distance > 20) {
            this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 0.9 : -this.enemy.speed * 0.9);
        } else {
            this.enemy.setVelocityX(0);
        }
    }
    
    performSearchPattern() {
        // Figure-8 search pattern
        const searchPhase = (this.patrolTimer % 120) / 120;
        if (searchPhase < 0.25) {
            this.enemy.setVelocityX(this.enemy.speed * 0.3);
        } else if (searchPhase < 0.5) {
            this.enemy.setVelocityX(-this.enemy.speed * 0.3);
        } else if (searchPhase < 0.75) {
            this.enemy.setVelocityX(this.enemy.speed * 0.3);
        } else {
            this.enemy.setVelocityX(-this.enemy.speed * 0.3);
        }
    }
    
    performPatrolJump(distance) {
        // Jump based on alert level and situation
        if (this.alertLevel >= 2) {
            // Alert jumping - more aggressive
            if (this.player.y < this.enemy.y - 30 && distance < 100) {
                this.enemy.setVelocityY(-500);
                this.enemy.jumpCooldown = 60;
            }
        } else {
            // Calm jumping - only for navigation
            if (!this.isGroundAhead(80) && distance > 150) {
                this.enemy.setVelocityY(-400);
                this.enemy.jumpCooldown = 80;
            }
        }
        
        // Jump to reach higher ground when searching
        if (this.alertLevel === 2 && this.player.y < this.enemy.y - 50 && distance < 150) {
            this.enemy.setVelocityY(-450);
            this.enemy.jumpCooldown = 70;
        }
    }
}

class KamikazeStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.chargeTimer = 0;
        this.explosionTimer = 0;
        this.isCharging = false;
        this.chargeDirection = 0;
        this.explosionRadius = 80;
    }
    
    update() {
        super.update(); // Call parent update for strategy switching
        
        this.chargeTimer++;
        this.explosionTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Kamikaze behavior with charging and explosion phases
        if (this.isCharging) {
            this.performCharge();
        } else {
            this.prepareCharge(distance, direction);
        }
        
        // Explosive jumping
        if (this.canJump()) {
            this.performExplosiveJump(distance);
        }
        
        // Self-destruct when very close
        if (distance < 40 && this.explosionTimer > 120) {
            this.performSelfDestruct();
        }
    }
    
    prepareCharge(distance, direction) {
        // Build up charge energy
        if (distance < 200) {
            this.chargeTimer++;
            
            // Start charging when conditions are met
            if (this.chargeTimer > 30 || distance < 100) {
                this.isCharging = true;
                this.chargeDirection = direction > 0 ? 1 : -1;
                this.chargeTimer = 0;
                this.performChargeStart();
            } else {
                // Move towards player while building charge
                this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 1.2 : -this.enemy.speed * 1.2);
            }
        } else {
            // Move towards player when far
            this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 1.8 : -this.enemy.speed * 1.8);
        }
    }
    
    performCharge() {
        // High-speed charge towards player
        this.enemy.setVelocityX(this.chargeDirection * this.enemy.speed * 2.5);
        
        // Create charge trail effect
        if (this.chargeTimer % 5 === 0) {
            const trail = this.enemy.scene.add.circle(
                this.enemy.x - this.chargeDirection * 20, 
                this.enemy.y, 
                8, 
                0xFF0000, 
                0.6
            );
            this.enemy.scene.tweens.add({
                targets: trail,
                alpha: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 200,
                onComplete: () => trail.destroy()
            });
        }
        
        // End charge after distance or time
        if (this.chargeTimer > 60) {
            this.isCharging = false;
            this.chargeTimer = 0;
        }
    }
    
    performChargeStart() {
        // Visual effect when starting charge
        const chargeEffect = this.enemy.scene.add.circle(this.enemy.x, this.enemy.y, 30, 0xFF4500, 0.8);
        this.enemy.scene.tweens.add({
            targets: chargeEffect,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => chargeEffect.destroy()
        });
        
        // Screen shake for charge start
        this.enemy.scene.cameras.main.shake(150, 0.02);
    }
    
    performExplosiveJump(distance) {
        // Explosive jumping with area damage
        if (this.player.y < this.enemy.y - 20 && distance < 150) {
            this.enemy.setVelocityY(-700);
            this.enemy.jumpCooldown = 15;
            this.createExplosionEffect();
        } else if (distance < 120 && Math.random() < 0.8) {
            this.enemy.setVelocityY(-600);
            this.enemy.jumpCooldown = 20;
            this.createExplosionEffect();
        }
    }
    
    createExplosionEffect() {
        // Create explosion effect on jump
        const explosion = this.enemy.scene.add.circle(this.enemy.x, this.enemy.y, 40, 0xFF0000, 0.7);
        this.enemy.scene.tweens.add({
            targets: explosion,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 250,
            onComplete: () => explosion.destroy()
        });
        
        // Screen shake for explosion
        this.enemy.scene.cameras.main.shake(100, 0.015);
    }
    
    performSelfDestruct() {
        console.log('KAMIKAZE SELF-DESTRUCT!');
        
        // Massive explosion effect
        const bigExplosion = this.enemy.scene.add.circle(this.enemy.x, this.enemy.y, 60, 0xFF0000, 0.9);
        this.enemy.scene.tweens.add({
            targets: bigExplosion,
            scaleX: 3,
            scaleY: 3,
            alpha: 0,
            duration: 400,
            onComplete: () => bigExplosion.destroy()
        });
        
        // Multiple explosion particles
        for (let i = 0; i < 8; i++) {
            const particle = this.enemy.scene.add.circle(
                this.enemy.x + (Math.random() - 0.5) * 100,
                this.enemy.y + (Math.random() - 0.5) * 100,
                6,
                0xFF4500,
                0.8
            );
            this.enemy.scene.tweens.add({
                targets: particle,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 300,
                onComplete: () => particle.destroy()
            });
        }
        
        // Strong screen shake
        this.enemy.scene.cameras.main.shake(500, 0.05);
        
        // Damage player if in range
        const distance = this.getDistanceToPlayer();
        if (distance < this.explosionRadius) {
            takeDamage();
            takeDamage(); // Double damage from explosion
        }
        
        // Destroy the enemy
        this.enemy.health = 0;
        this.explosionTimer = 0;
    }
}

class BossStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.attackTimer = 0;
        this.phase = 1; // Boss has different phases based on health
        this.specialAttackCooldown = 0;
    }
    
    update() {
        // Boss doesn't use normal strategy switching
        this.attackTimer++;
        if (this.specialAttackCooldown > 0) {
            this.specialAttackCooldown--;
        }
        
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Update boss phase based on health
        if (this.enemy.health <= this.enemy.maxHealth * 0.3) {
            this.phase = 3; // Final phase - very aggressive
        } else if (this.enemy.health <= this.enemy.maxHealth * 0.6) {
            this.phase = 2; // Second phase - more aggressive
        }
        
        // Boss movement based on phase
        if (this.phase === 1) {
            // Phase 1: Slow but powerful
            if (distance > 50) {
                this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 0.8 : -this.enemy.speed * 0.8);
            } else {
                this.enemy.setVelocityX(0);
            }
        } else if (this.phase === 2) {
            // Phase 2: Faster movement
            if (distance > 30) {
                this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 1.2 : -this.enemy.speed * 1.2);
            } else {
                this.enemy.setVelocityX(0);
            }
        } else {
            // Phase 3: Very fast and aggressive
            if (distance > 20) {
                this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 1.5 : -this.enemy.speed * 1.5);
            } else {
                this.enemy.setVelocityX(0);
            }
        }
        
        // Boss jumping behavior
        if (this.canJump()) {
            if (this.player.y < this.enemy.y - 20 && distance < 150) {
                this.enemy.setVelocityY(-500);
                this.enemy.jumpCooldown = 40;
            } else if (distance < 100 && Math.random() < 0.3) {
                this.enemy.setVelocityY(-400);
                this.enemy.jumpCooldown = 30;
            }
        }
        
        // Boss special attacks
        this.performSpecialAttack(distance);
    }
    
    performSpecialAttack(distance) {
        if (this.specialAttackCooldown <= 0) {
            // Ground slam attack
            if (distance < 80 && this.enemy.body.touching.down) {
                this.groundSlamAttack();
                this.specialAttackCooldown = 120; // 2 second cooldown
            }
            // Charge attack
            else if (distance > 100 && distance < 200 && this.phase >= 2) {
                this.chargeAttack();
                this.specialAttackCooldown = 180; // 3 second cooldown
            }
        }
    }
    
    groundSlamAttack() {
        console.log('BOSS GROUND SLAM!');
        // Create shockwave effect
        const shockwave = this.enemy.scene.add.circle(this.enemy.x, this.enemy.y + 20, 60, 0xFF0000, 0.6);
        this.enemy.scene.tweens.add({
            targets: shockwave,
            scaleX: 3,
            scaleY: 3,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                shockwave.destroy();
            }
        });
        
        // Screen shake
        this.enemy.scene.cameras.main.shake(300, 0.03);
        
        // Damage player if close
        const distance = this.getDistanceToPlayer();
        if (distance < 100) {
            takeDamage();
            takeDamage(); // Double damage from boss
        }
    }
    
    chargeAttack() {
        console.log('BOSS CHARGE ATTACK!');
        // Boss charges forward
        const direction = this.getDirectionToPlayer();
        this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 3 : -this.enemy.speed * 3);
        
        // Create charge effect
        const chargeEffect = this.enemy.scene.add.rectangle(this.enemy.x, this.enemy.y, 80, 40, 0xFF4500, 0.8);
        this.enemy.scene.tweens.add({
            targets: chargeEffect,
            alpha: 0,
            duration: 400,
            onComplete: () => {
                chargeEffect.destroy();
            }
        });
    }
}

// NEW ADVANCED STRATEGIES
class SniperStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.aimTimer = 0;
        this.shotCooldown = 0;
        this.optimalRange = 150;
        this.isAiming = false;
    }
    
    update() {
        super.update();
        
        this.aimTimer++;
        if (this.shotCooldown > 0) {
            this.shotCooldown--;
        }
        
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Maintain optimal sniper range
        this.maintainSniperRange(distance, direction);
        
        // Aim and shoot
        if (this.shotCooldown <= 0 && distance < 200) {
            this.performSniperShot();
        }
        
        // Minimal jumping - only for positioning
        if (this.canJump() && distance > 100 && !this.isGroundAhead(120)) {
            this.enemy.setVelocityY(-400);
            this.enemy.jumpCooldown = 80;
        }
    }
    
    maintainSniperRange(distance, direction) {
        if (distance < this.optimalRange - 30) {
            // Move away to maintain range
            this.enemy.setVelocityX(direction > 0 ? -this.enemy.speed * 0.8 : this.enemy.speed * 0.8);
        } else if (distance > this.optimalRange + 50) {
            // Move closer to get in range
            this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 0.6 : -this.enemy.speed * 0.6);
        } else {
            this.enemy.setVelocityX(0); // Hold position
        }
    }
    
    performSniperShot() {
        this.isAiming = true;
        
        // Create sniper shot effect
        const shotX = this.enemy.x;
        const shotY = this.enemy.y;
        const direction = this.getDirectionToPlayer();
        
        // Laser beam effect
        const laser = this.enemy.scene.add.rectangle(
            shotX + direction * 30, 
            shotY, 
            100, 
            4, 
            0x00FFFF, 
            0.9
        );
        this.enemy.scene.tweens.add({
            targets: laser,
            x: shotX + direction * 150,
            alpha: 0,
            duration: 100,
            onComplete: () => laser.destroy()
        });
        
        this.shotCooldown = 90; // 1.5 second cooldown
        this.isAiming = false;
    }
}

class FlankerStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.flankTimer = 0;
        this.flankDirection = Math.random() < 0.5 ? 1 : -1;
        this.isFlanking = false;
    }
    
    update() {
        super.update();
        
        this.flankTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Flanking behavior
        if (distance > 100) {
            this.performFlanking(distance, direction);
        } else {
            this.performFlankAttack(distance, direction);
        }
        
        // Flanking jumps
        if (this.canJump() && this.isFlanking) {
            this.performFlankJump(distance);
        }
    }
    
    performFlanking(distance, direction) {
        this.isFlanking = true;
        
        // Move to flank position
        const flankX = this.player.x + (this.flankDirection * 100);
        const distanceToFlank = Math.abs(flankX - this.enemy.x);
        
        if (distanceToFlank > 30) {
            const moveDirection = flankX > this.enemy.x ? 1 : -1;
            this.enemy.setVelocityX(moveDirection * this.enemy.speed * 1.1);
        } else {
            this.enemy.setVelocityX(0);
        }
    }
    
    performFlankAttack(distance, direction) {
        this.isFlanking = false;
        
        // Attack from the side
        if (distance > 20) {
            this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 1.3 : -this.enemy.speed * 1.3);
        } else {
            this.enemy.setVelocityX(0);
        }
    }
    
    performFlankJump(distance) {
        if (distance < 80 && Math.random() < 0.7) {
            this.enemy.setVelocityY(-550);
            this.enemy.jumpCooldown = 30;
        }
    }
}

class GuardianStrategy extends EnemyStrategy {
    constructor(enemy, player, ground) {
        super(enemy, player, ground);
        this.guardPosition = { x: enemy.x, y: enemy.y };
        this.protectionRadius = 120;
        this.alertTimer = 0;
    }
    
    update() {
        super.update();
        
        this.alertTimer++;
        const distance = this.getDistanceToPlayer();
        const direction = this.getDirectionToPlayer();
        
        // Guard behavior
        if (distance < this.protectionRadius) {
            this.performGuardDuty(distance, direction);
        } else {
            this.returnToGuardPosition();
        }
        
        // Guard jumping
        if (this.canJump()) {
            this.performGuardJump(distance);
        }
    }
    
    performGuardDuty(distance, direction) {
        // Intercept player
        if (distance > 30) {
            this.enemy.setVelocityX(direction > 0 ? this.enemy.speed * 0.9 : -this.enemy.speed * 0.9);
        } else {
            this.enemy.setVelocityX(0);
        }
    }
    
    returnToGuardPosition() {
        const distanceToGuard = Math.abs(this.guardPosition.x - this.enemy.x);
        
        if (distanceToGuard > 20) {
            const direction = this.guardPosition.x > this.enemy.x ? 1 : -1;
            this.enemy.setVelocityX(direction * this.enemy.speed * 0.7);
        } else {
            this.enemy.setVelocityX(0);
        }
    }
    
    performGuardJump(distance) {
        if (distance < 60 && this.player.y < this.enemy.y - 20) {
            this.enemy.setVelocityY(-500);
            this.enemy.jumpCooldown = 50;
        }
    }
}

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
let levelComplete = false;
let attackCooldown = 0;
let gameScene;
let enemies = [];
let enemySpawnTimer = 0;
let playerHealth = 100;
let ground;
let enemiesDefeated = 0;
let bossSpawned = false;
let boss = null;
let currentWeapon = 0;
let weapons = [];
let weaponSwitchCooldown = 0;
let currency = 0;
let menuOpen = false;
let menuScene = null;
let weaponUpgrades = {};
let unlockedWeapons = [0]; // Start with sword unlocked
let bossesDefeated = 0;
let bossDefeatInProgress = false;
let updateCounter = 0;
let lastUpdateTime = 0;

// NUCLEAR OPTION: Global function to force game to continue
function forceGameContinue() {
    console.log('NUCLEAR: Forcing game to continue...');
    if (gameScene && gameScene.scene) {
        if (gameScene.scene.isPaused()) {
            console.log('NUCLEAR: Scene was paused, forcing resume...');
            gameScene.scene.resume();
        }
        console.log('NUCLEAR: Game should now be running');
    }
}

// MANUAL OVERRIDE: Call this from browser console if game pauses
window.forceGameContinue = forceGameContinue;
window.resumeGame = forceGameContinue;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting simple game...');
    const game = new Phaser.Game(config);
});

function create() {
    console.log('Creating simple game...');
    gameScene = this; // Store scene reference
    
    // Create player immediately - no server needed
    player = this.physics.add.sprite(100, 500, null);
    player.setDisplaySize(32, 48);
    player.setTint(0xFF0000); // Red
    player.setBounce(0.2);
    player.setCollideWorldBounds(false); // Allow going off screen
    
    // Create ground - make it much wider with proper ending
    ground = this.physics.add.staticGroup();
    for (let x = 0; x < 3000; x += 32) { // Even wider ground
        const block = this.add.rectangle(x, 568, 32, 32, 0x8B4513);
        ground.add(block);
    }
    
    // Create many platforms across the level
    const platforms = [
        {x: 300, y: 450, width: 128},
        {x: 600, y: 350, width: 128},
        {x: 900, y: 250, width: 128},
        {x: 1200, y: 400, width: 128},
        {x: 1500, y: 300, width: 128},
        {x: 1800, y: 200, width: 128},
        {x: 2100, y: 350, width: 128},
        {x: 2400, y: 400, width: 128}, // More platforms
        {x: 2700, y: 300, width: 128}
    ];
    
    platforms.forEach(platform => {
        const platformRect = this.add.rectangle(platform.x, platform.y, platform.width, 32, 0x8B4513);
        ground.add(platformRect);
    });
    
    // Create a GOAL at the end
    const goal = this.add.rectangle(2800, 500, 64, 64, 0x00FF00); // Green goal
    ground.add(goal);
    
    // Add collisions
    this.physics.add.collider(player, ground);
    
    // Check for goal collision
    this.physics.add.overlap(player, goal, () => {
        if (!levelComplete) {
            levelComplete = true;
            this.add.text(600, 300, 'LEVEL COMPLETE!', {
                fontSize: '48px',
                fill: '#00FF00'
            }).setOrigin(0.5);
            console.log('Level Complete!');
        }
    });
    
    // Setup controls
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('W,A,S,D,SPACE,X,C,M,ESC');
    
    // CAMERA FOLLOWING - This is the key fix!
    this.cameras.main.setBounds(0, 0, 3000, 600); // Set world bounds
    this.cameras.main.startFollow(player); // Camera follows player
    this.cameras.main.setDeadzone(100, 100); // Smooth camera movement
    
    // Add invisible walls to prevent falling off
    const leftWall = this.add.rectangle(-16, 300, 32, 600, 0x000000);
    leftWall.setVisible(false);
    ground.add(leftWall);
    
    const rightWall = this.add.rectangle(3016, 300, 32, 600, 0x000000);
    rightWall.setVisible(false);
    ground.add(rightWall);
    
    // Start enemy spawning timer
    enemySpawnTimer = 0;
    
    // Initialize weapons
    initializeWeapons();
    
    // Create UI elements
    createUI();
    
    console.log('Game created! Camera will follow you as you move right!');
    console.log('Reach the GREEN GOAL at the end to complete the level!');
    console.log('Press X to attack! Enemies are FAST and TOUGH - need multiple hits!');
    console.log('Press C to change weapons!');
    console.log('Press M to open Weapon Shop!');
    console.log('Enemy Strategy Colors: Orange=Aggressive, Blue=Defensive, Green=Patrolling, Red=Kamikaze, Cyan=Sniper, Gold=Flanker, Purple=Guardian');
    console.log('Defeat 5 enemies to spawn a BOSS!');
    console.log('Defeat enemies to earn coins for weapon upgrades!');
    console.log('After defeating the boss, the game continues with more enemies!');
    console.log('Enemy spawn rate increases with each boss defeated for progressive difficulty!');
    console.log(`Starting with ${weapons[currentWeapon].name} - Damage: ${weapons[currentWeapon].damage}, Range: ${weapons[currentWeapon].range}`);
}

function initializeWeapons() {
    weapons = [
        new Sword(),
        new Hammer(),
        new Spear(),
        new Bow(),
        new Magic(),
        new Lightning(),
        new IceBlast(),
        new FireBlade(),
        new ShadowDagger()
    ];
    currentWeapon = 0;
    
    // Initialize weapon upgrades
    weapons.forEach((weapon, index) => {
        weaponUpgrades[index] = {
            damage: 0,
            range: 0,
            cooldown: 0,
            maxUpgrades: 3
        };
    });
    
    console.log('Weapons initialized:', weapons.map(w => w.name));
    console.log('Currency system active - defeat enemies to earn coins!');
}

function createUI() {
    // Enemy counter text
    gameScene.enemyCounter = gameScene.add.text(20, 20, 'Enemies Defeated: 0/5', {
        fontSize: '18px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 2
    });
    
    // Boss warning text (hidden initially)
    gameScene.bossWarning = gameScene.add.text(600, 50, 'BOSS APPROACHING!', {
        fontSize: '24px',
        fill: '#FF0000',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5).setVisible(false);
    
    // Weapon display
    gameScene.weaponDisplay = gameScene.add.text(20, 50, `Weapon: ${weapons[currentWeapon].name}`, {
        fontSize: '16px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 2
    });
    
    // Weapon stats display
    gameScene.weaponStats = gameScene.add.text(20, 70, `Damage: ${weapons[currentWeapon].damage} | Range: ${weapons[currentWeapon].range}`, {
        fontSize: '12px',
        fill: '#CCCCCC',
        stroke: '#000000',
        strokeThickness: 1
    });
    
    // Currency display
    gameScene.currencyDisplay = gameScene.add.text(20, 90, `Coins: ${currency}`, {
        fontSize: '16px',
        fill: '#FFD700',
        stroke: '#000000',
        strokeThickness: 2
    });
    
    // Menu instruction
    gameScene.menuInstruction = gameScene.add.text(20, 110, 'Press M for Weapon Shop', {
        fontSize: '14px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1
    });
    
    // Boss defeat counter
    gameScene.bossCounter = gameScene.add.text(20, 130, 'Bosses Defeated: 0', {
        fontSize: '14px',
        fill: '#FFD700',
        stroke: '#000000',
        strokeThickness: 1
    });
    
    // Difficulty indicator
    gameScene.difficultyDisplay = gameScene.add.text(20, 150, 'Difficulty: Normal', {
        fontSize: '12px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 1
    });
}

function switchWeapon() {
    // Find next owned weapon
    let attempts = 0;
    do {
        currentWeapon = (currentWeapon + 1) % weapons.length;
        attempts++;
    } while (!unlockedWeapons.includes(currentWeapon) && attempts < weapons.length);
    
    console.log('Switched to:', weapons[currentWeapon].name);
    
    // Update UI
    if (gameScene.weaponDisplay) {
        gameScene.weaponDisplay.setText(`Weapon: ${weapons[currentWeapon].name}`);
    }
    if (gameScene.weaponStats) {
        gameScene.weaponStats.setText(`Damage: ${weapons[currentWeapon].damage} | Range: ${weapons[currentWeapon].range}`);
    }
    
    // Visual feedback for weapon switch
    const switchEffect = gameScene.add.circle(player.x, player.y, 30, weapons[currentWeapon].color, 0.8);
    gameScene.tweens.add({
        targets: switchEffect,
        scaleX: 2,
        scaleY: 2,
        alpha: 0,
        duration: 300,
        onComplete: () => {
            switchEffect.destroy();
        }
    });
}

function updateUI() {
    // Update enemy counter
    if (gameScene.enemyCounter) {
        gameScene.enemyCounter.setText(`Enemies Defeated: ${enemiesDefeated}/5`);
    }
    
    // Update weapon display
    if (gameScene.weaponDisplay) {
        gameScene.weaponDisplay.setText(`Weapon: ${weapons[currentWeapon].name}`);
    }
    if (gameScene.weaponStats) {
        gameScene.weaponStats.setText(`Damage: ${weapons[currentWeapon].damage} | Range: ${weapons[currentWeapon].range}`);
    }
    
    // Update currency display
    if (gameScene.currencyDisplay) {
        gameScene.currencyDisplay.setText(`Coins: ${currency}`);
    }
    
    // Update boss counter
    if (gameScene.bossCounter) {
        gameScene.bossCounter.setText(`Bosses Defeated: ${bossesDefeated}`);
    }
    
    // Update difficulty display
    if (gameScene.difficultyDisplay) {
        let difficultyText = 'Normal';
        let difficultyColor = '#FFFFFF';
        
        if (bossesDefeated >= 1) {
            difficultyText = 'Hard';
            difficultyColor = '#FFA500';
        }
        if (bossesDefeated >= 3) {
            difficultyText = 'Very Hard';
            difficultyColor = '#FF4500';
        }
        if (bossesDefeated >= 5) {
            difficultyText = 'Extreme';
            difficultyColor = '#FF0000';
        }
        
        gameScene.difficultyDisplay.setText(`Difficulty: ${difficultyText}`);
        gameScene.difficultyDisplay.setFill(difficultyColor);
    }
    
    // Show boss warning when close to spawning
    if (enemiesDefeated >= 4 && !bossSpawned) {
        if (gameScene.bossWarning) {
            gameScene.bossWarning.setVisible(true);
        }
    } else if (bossSpawned && gameScene.bossWarning) {
        gameScene.bossWarning.setVisible(false);
    }
}

function update() {
    updateCounter++;
    
    if (!player) {
        console.log('UPDATE: Player is null, returning early');
        return;
    }
    
    // AGGRESSIVE: Force scene to resume if it's paused (safety check)
    if (gameScene.scene.isPaused()) {
        console.log('UPDATE: Scene was paused unexpectedly, forcing resume...');
        gameScene.scene.resume();
        console.log('UPDATE: Scene resume forced');
    }
    
    // CONTINUOUS MONITORING: Check every frame if scene gets paused
    if (gameScene.scene.isPaused() && !menuOpen) {
        console.log('CONTINUOUS: Scene paused during gameplay, forcing resume...');
        gameScene.scene.resume();
    }
    
    // Track update timing
    lastUpdateTime = gameScene.time.now;
    
    // Debug: Log every 60 frames to check if update is running after boss defeat
    if (gameScene.time.now % 1000 < 16) {
        console.log('UPDATE: Function running - time:', gameScene.time.now, 'Scene paused:', gameScene.scene.isPaused(), 'BossDefeatInProgress:', bossDefeatInProgress, 'UpdateCounter:', updateCounter);
        console.log('GAME IS RUNNING - Update function active');
        console.log('SIMPLE TEST: Game loop is working');
    }
    
    // Check if update function has stopped being called
    if (gameScene.time.now - lastUpdateTime > 2000) {
        console.log('WARNING: Update function may have stopped! Last update was', gameScene.time.now - lastUpdateTime, 'ms ago');
    }
    
    // Debug: Log every 60 frames to check if update is running (disabled for performance)
    // if (gameScene.time.now % 1000 < 16) {
    //     console.log('Game update running, enemies:', enemies.length);
    // }
    
    // Movement
    if (cursors.left.isDown || keys.A.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown || keys.D.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }
    
    // Strong jump
    if ((cursors.up.isDown || keys.W.isDown || keys.SPACE.isDown) && player.body.touching.down) {
        player.setVelocityY(-600);
    }
    
    // FIXED ATTACK SYSTEM - Use JustDown instead of isDown
    if (Phaser.Input.Keyboard.JustDown(keys.X) && attackCooldown <= 0) {
        attack();
        attackCooldown = weapons[currentWeapon].cooldown; // Use weapon-specific cooldown
    }
    
    // Reduce attack cooldown
    if (attackCooldown > 0) {
        attackCooldown--;
    }
    
    // Weapon switching
    if (Phaser.Input.Keyboard.JustDown(keys.C) && weaponSwitchCooldown <= 0) {
        switchWeapon();
        weaponSwitchCooldown = 10; // Prevent rapid switching
    }
    
    // Reduce weapon switch cooldown
    if (weaponSwitchCooldown > 0) {
        weaponSwitchCooldown--;
    }
    
    // Menu controls - prevent opening during boss defeat
    if (Phaser.Input.Keyboard.JustDown(keys.M) && !bossDefeatInProgress) {
        toggleMenu();
    }
    
    // Close menu with ESC key
    if (Phaser.Input.Keyboard.JustDown(keys.ESC) && menuOpen) {
        closeMenu();
    }
    
    // ENEMY SPAWNING SYSTEM - dynamic frequency based on boss defeats
    enemySpawnTimer++;
    
    // Calculate spawn rate based on bosses defeated (gets faster over time)
    let baseSpawnRate = 600; // 10 seconds base
    let difficultyMultiplier = Math.max(0.3, 1 - (bossesDefeated * 0.1)); // Gets faster with each boss
    let currentSpawnRate = Math.floor(baseSpawnRate * difficultyMultiplier);
    
    if (enemySpawnTimer >= currentSpawnRate) {
        // Limit maximum enemies to prevent game from becoming unplayable
        let maxEnemies = 8 + (bossesDefeated * 2); // Increases with boss defeats
        if (enemies.length < maxEnemies) {
        spawnEnemy();
        enemySpawnTimer = 0;
            
            // Debug: Log spawn rate changes
            if (bossesDefeated > 0) {
                console.log(`Enemy spawn rate: ${currentSpawnRate} frames (${(currentSpawnRate/60).toFixed(1)}s) - Bosses defeated: ${bossesDefeated}, Max enemies: ${maxEnemies}`);
            }
        } else {
            // Reset timer if at max enemies to keep checking
            enemySpawnTimer = 0;
        }
    }
    
    // Update enemies
    updateEnemies();
    
    // Update boss
    updateBoss();
    
    // Update UI
    updateUI();
    
    // Check for boss spawning
    if (enemiesDefeated >= 5 && !bossSpawned && !boss) {
        console.log('Spawning new boss...');
        spawnBoss();
        bossSpawned = true;
    }
    
    // Debug: Log game state periodically
    if (gameScene.time.now % 3000 < 16) { // Every 3 seconds
        console.log(`Game running - Enemies: ${enemies.length}, Boss: ${boss ? 'Active' : 'None'}, Defeated: ${enemiesDefeated}, BossDefeatInProgress: ${bossDefeatInProgress}`);
    }
    
    // Force continue if boss defeat is stuck
    if (bossDefeatInProgress && gameScene.time.now % 5000 < 16) {
        console.log('Boss defeat in progress - checking if stuck...');
        if (!boss) {
            console.log('Boss is null, resetting defeat flag');
            bossDefeatInProgress = false;
        }
    }
    
    // Reset player if they fall too far (safety net)
    if (player.y > 700) {
        player.setPosition(100, 500);
        player.setVelocity(0, 0);
        console.log('Player reset to start position');
    }
}

function spawnEnemy() {
    console.log('Enemy spawning!');
    
    // Spawn enemy at random position to the right of player
    const spawnX = player.x + 400 + Math.random() * 200;
    const spawnY = 500; // Ground level
    
    const enemy = gameScene.physics.add.sprite(spawnX, spawnY, null);
    enemy.setDisplaySize(24, 32);
    enemy.setTint(0x8B4513); // Brown color
    enemy.setBounce(0.1);
    enemy.body.setSize(24, 32);
    enemy.setCollideWorldBounds(false);
    
    // ENHANCED ENEMY PROPERTIES
    enemy.jumpCooldown = 0;
    enemy.lastJumpY = enemy.y;
    enemy.health = 3; // ENEMIES NOW HAVE HEALTH - need 3 hits to kill
    enemy.maxHealth = 3;
    enemy.hitCooldown = 0; // Prevents damage spam
    enemy.speed = 80; // INCREASED SPEED from 50 to 80 (60% faster!)
    
    // STRATEGY PATTERN: Assign random strategy to enemy (including new advanced strategies)
    const strategies = [
        AggressiveStrategy, 
        DefensiveStrategy, 
        PatrollingStrategy, 
        KamikazeStrategy,
        SniperStrategy,
        FlankerStrategy,
        GuardianStrategy
    ];
    const StrategyClass = strategies[Math.floor(Math.random() * strategies.length)];
    enemy.strategy = new StrategyClass(enemy, player, ground);
    
    // Visual indicator for strategy type
    if (StrategyClass === AggressiveStrategy) {
        enemy.setTint(0xFF4500); // Orange-red for aggressive
    } else if (StrategyClass === DefensiveStrategy) {
        enemy.setTint(0x4169E1); // Blue for defensive
    } else if (StrategyClass === PatrollingStrategy) {
        enemy.setTint(0x32CD32); // Green for patrolling
    } else if (StrategyClass === KamikazeStrategy) {
        enemy.setTint(0xDC143C); // Crimson for kamikaze
    } else if (StrategyClass === SniperStrategy) {
        enemy.setTint(0x00FFFF); // Cyan for sniper
    } else if (StrategyClass === FlankerStrategy) {
        enemy.setTint(0xFFD700); // Gold for flanker
    } else if (StrategyClass === GuardianStrategy) {
        enemy.setTint(0x800080); // Purple for guardian
    }
    
    // Add strategy indicator text (temporarily disabled to test performance)
    // enemy.strategyText = gameScene.add.text(enemy.x, enemy.y - 40, StrategyClass.name.replace('Strategy', ''), {
    //     fontSize: '12px',
    //     fill: '#FFFFFF',
    //     stroke: '#000000',
    //     strokeThickness: 2
    // }).setOrigin(0.5);
    
    // FIXED: Add collision with ground and platforms
    gameScene.physics.add.collider(enemy, ground);
    
    // Add enemy to array
    enemies.push(enemy);
    
    // Enemy-player collision
    gameScene.physics.add.overlap(player, enemy, () => {
        takeDamage();
    });
    
    console.log('Enemy spawned with', StrategyClass.name, 'strategy at', spawnX, spawnY, '- Health:', enemy.health);
}

function spawnBoss() {
    console.log('BOSS APPEARS!');
    
    // Spawn boss at a distance from player
    const spawnX = player.x + 300;
    const spawnY = 500;
    
    boss = gameScene.physics.add.sprite(spawnX, spawnY, null);
    boss.setDisplaySize(48, 64); // Larger than normal enemies
    boss.setTint(0x8B0000); // Dark red color
    boss.setBounce(0.1);
    boss.body.setSize(48, 64);
    boss.setCollideWorldBounds(false);
    
    // Boss properties
    boss.jumpCooldown = 0;
    boss.health = 15; // Much higher health than normal enemies
    boss.maxHealth = 15;
    boss.hitCooldown = 0;
    boss.speed = 60; // Moderate speed
    boss.isBoss = true;
    
    // Boss strategy
    boss.strategy = new BossStrategy(boss, player, ground);
    
    // Boss visual effects
    boss.setTint(0x8B0000); // Dark red
    boss.setScale(1.2); // Slightly larger
    
    // Add boss collision
    gameScene.physics.add.collider(boss, ground);
    
    // Boss-player collision
    gameScene.physics.add.overlap(player, boss, () => {
        takeDamage();
        takeDamage(); // Boss does double damage on contact
    });
    
    // Boss health bar
    boss.healthBar = gameScene.add.graphics();
    updateBossHealthBar();
    
    // Boss name label
    boss.nameLabel = gameScene.add.text(boss.x, boss.y - 80, 'BOSS', {
        fontSize: '16px',
        fill: '#FF0000',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5);
    
    console.log('BOSS spawned at', spawnX, spawnY, '- Health:', boss.health);
}

function updateBossHealthBar() {
    if (!boss || !boss.healthBar || bossDefeatInProgress) {
        console.log('UPDATEBOSSHEALTH: Skipping health bar update - boss defeated');
        return;
    }
    
    boss.healthBar.clear();
    
    // Health bar background
    boss.healthBar.fillStyle(0x000000, 0.8);
    boss.healthBar.fillRect(boss.x - 60, boss.y - 50, 120, 8);
    
    // Health bar fill
    const healthPercent = boss.health / boss.maxHealth;
    if (healthPercent > 0.6) {
        boss.healthBar.fillStyle(0x00FF00); // Green
    } else if (healthPercent > 0.3) {
        boss.healthBar.fillStyle(0xFFFF00); // Yellow
            } else {
        boss.healthBar.fillStyle(0xFF0000); // Red
    }
    boss.healthBar.fillRect(boss.x - 60, boss.y - 50, 120 * healthPercent, 8);
}

function updateBoss() {
    if (!boss || !boss.active || bossSpawned === false || bossDefeatInProgress) {
        console.log('UPDATEBOSS: Skipping boss update - boss defeated or not active');
        return;
    }
    
            // Update cooldowns
    if (boss.jumpCooldown > 0) {
        boss.jumpCooldown--;
    }
    if (boss.hitCooldown > 0) {
        boss.hitCooldown--;
    }
    
    // Update boss strategy
    if (boss.strategy) {
        try {
            boss.strategy.update();
        } catch (error) {
            console.error('Boss strategy update error:', error);
        }
    }
    
    // Update boss health bar
    updateBossHealthBar();
    
    // Update boss name label position
    if (boss.nameLabel) {
        boss.nameLabel.setPosition(boss.x, boss.y - 80);
    }
    
    // Boss health-based visual changes
    if (boss.health <= boss.maxHealth * 0.3) {
        // Final phase - flash red
        boss.setTint(0xFF0000);
    } else if (boss.health <= boss.maxHealth * 0.6) {
        // Second phase - orange
        boss.setTint(0xFF4500);
    }
    
    // Remove boss if too far behind
    if (boss.x < player.x - 500) {
        if (boss.healthBar) {
            boss.healthBar.destroy();
        }
        if (boss.nameLabel) {
            boss.nameLabel.destroy();
        }
        boss.destroy();
        boss = null;
        bossSpawned = false;
    }
}

function updateEnemies() {
    enemies.forEach((enemy, index) => {
        if (enemy && enemy.active) {
            // Update cooldowns
            if (enemy.jumpCooldown > 0) {
                enemy.jumpCooldown--;
            }
            if (enemy.hitCooldown > 0) {
                enemy.hitCooldown--;
            }
            
            // STRATEGY PATTERN: Use enemy's strategy for behavior
            if (enemy.strategy) {
                try {
                    enemy.strategy.update();
                } catch (error) {
                    console.error('Strategy update error:', error);
                    // Remove problematic enemy
                    if (enemy.strategyText) {
                        enemy.strategyText.destroy();
                    }
                    enemy.destroy();
                    enemies.splice(index, 1);
                }
            }
            
            // Update strategy text position (temporarily disabled)
            // if (enemy.strategyText) {
            //     enemy.strategyText.setPosition(enemy.x, enemy.y - 40);
            // }
            
            // HEALTH BAR VISUAL FEEDBACK - simplified to prevent performance issues
            if (enemy.health < enemy.maxHealth) {
                // Simple health-based color changes
                if (enemy.health === 2) {
                    enemy.setTint(0x666666); // Gray for damaged
                } else if (enemy.health === 1) {
                    enemy.setTint(0x333333); // Dark gray for heavily damaged
                }
            }
            
            // Remove enemies that are too far behind
            if (enemy.x < player.x - 500) {
                if (enemy.strategyText) {
                    enemy.strategyText.destroy();
                }
                enemy.destroy();
                enemies.splice(index, 1);
            }
        }
    });
}

function takeDamage() {
    playerHealth -= 20;
    console.log('Player took damage! Health:', playerHealth);
    
    // Flash player red
    player.setTint(0xFF0000);
    gameScene.time.delayedCall(200, () => {
        player.setTint(0xFF0000); // Keep red tint
    });
    
    // Screen shake
    gameScene.cameras.main.shake(200, 0.02);
    
    if (playerHealth <= 0) {
        console.log('Player died!');
        // Reset player
        player.setPosition(100, 500);
        player.setVelocity(0, 0);
        playerHealth = 100;
    }
}

function attack() {
    console.log('ATTACK: Function called');
    
    // PREVENT DOUBLE BOSS DEFEAT: Check if boss is already defeated
    if (bossDefeatInProgress) {
        console.log('ATTACK: Boss defeat already in progress - skipping');
        return;
    }
    const weapon = weapons[currentWeapon];
    console.log(`Player attacks with ${weapon.name}!`);
    
    // Create attack effect
    const attackX = player.x + (player.flipX ? -40 : 40);
    const attackY = player.y;
    const direction = player.flipX ? -1 : 1;
    
    // Create weapon-specific attack effect
    weapon.createAttackEffect(gameScene, attackX, attackY, direction);
    
    // ENHANCED COMBAT - Multiple hits required
    enemies.forEach((enemy, index) => {
        if (enemy && enemy.active && enemy.hitCooldown <= 0) {
            const distance = Phaser.Math.Distance.Between(attackX, attackY, enemy.x, enemy.y);
            if (distance < weapon.range) {
                // DAMAGE ENEMY - use weapon damage
                enemy.health -= weapon.damage;
                enemy.hitCooldown = 10; // Prevent damage spam
                
                console.log('Enemy hit! Health remaining:', enemy.health);
                
                // Visual feedback for hit
                enemy.setTint(0xFF0000); // Flash red
                gameScene.time.delayedCall(100, () => {
                    if (enemy.health === 2) {
                        enemy.setTint(0x996633);
                    } else if (enemy.health === 1) {
                        enemy.setTint(0x663300);
                    } else {
                        enemy.setTint(0x8B4513);
                    }
                });
                
                // Screen shake for hit
                gameScene.cameras.main.shake(50, 0.005);
                
                // Destroy enemy if health reaches 0
                if (enemy.health <= 0) {
                    console.log('Enemy defeated!');
                    enemiesDefeated++; // Track defeated enemies
                    
                    // Award currency based on enemy type
                    const currencyReward = getEnemyCurrencyReward(enemy);
                    currency += currencyReward;
                    console.log(`Earned ${currencyReward} coins! Total: ${currency}`);
                    
                    if (enemy.strategyText) {
                        enemy.strategyText.destroy();
                    }
                    enemy.destroy();
                    enemies.splice(index, 1);
                }
            }
        }
    });
    
    // BOSS COMBAT - Boss takes more hits to defeat
    if (boss && boss.active && boss.hitCooldown <= 0) {
        const distance = Phaser.Math.Distance.Between(attackX, attackY, boss.x, boss.y);
        if (distance < weapon.range + 20) { // Slightly larger hit area for boss
            boss.health -= weapon.damage;
            boss.hitCooldown = 15; // Longer cooldown for boss
            
            console.log('BOSS HIT! Health remaining:', boss.health);
            
            // Boss hit visual feedback
            boss.setTint(0xFF0000);
            gameScene.time.delayedCall(150, () => {
                // Check if boss still exists before accessing properties
                if (boss && boss.active) {
                    if (boss.health <= boss.maxHealth * 0.3) {
                        boss.setTint(0xFF0000);
                    } else if (boss.health <= boss.maxHealth * 0.6) {
                        boss.setTint(0xFF4500);
                    } else {
                        boss.setTint(0x8B0000);
                    }
                }
            });
            
            // REMOVED: Screen shake for boss hit - might be causing pause
            // gameScene.cameras.main.shake(100, 0.01);
            
            // Test boss health without doing anything
            if (boss.health <= 0) {
                console.log('BOSS HEALTH IS 0 - testing pause issue');
                console.log('BOSS HEALTH:', boss.health);
                console.log('BOSS DEFEAT IN PROGRESS:', bossDefeatInProgress);
            }
            
            // PREVENT DOUBLE BOSS DEFEAT: Check if already defeated
            if (bossDefeatInProgress) {
                console.log('BOSS HIT: Boss defeat already in progress - skipping defeat logic');
                return;
            }
            
            // Boss defeat - ABSOLUTE MINIMUM TEST
            if (boss.health <= 0 && !bossDefeatInProgress) {
                console.log('BOSS DEFEATED! - ABSOLUTE MINIMUM VERSION');
                bossDefeatInProgress = true;
                
                // FIX: Properly destroy boss instead of hiding
                if (boss) {
                    // Destroy health bar first
                    if (boss.healthBar) {
                        boss.healthBar.destroy();
                    }
                    
                    // Destroy name label
                    if (boss.nameLabel) {
                        boss.nameLabel.destroy();
                    }
                    
                    // Destroy boss sprite
                    boss.destroy();
                }
                
                // Reset to null
                boss = null;
                bossSpawned = false;
                
                // FIX: Reset the flag so game can continue
                bossDefeatInProgress = false;
                
                // FIX: Add back essential counters
                enemiesDefeated = 0;
                bossesDefeated++;
                currency += 50;
                playerHealth = Math.min(100, playerHealth + 30);
                
                console.log('FIXED: Boss hidden - flag reset, counters updated');
                console.log('FIXED: Scene paused after boss hide:', gameScene.scene.isPaused());
            }
        }
    }
    
    // REMOVED: Screen shake effect - might be causing pause
    // gameScene.cameras.main.shake(100, 0.01);
    
    // REMOVED: Audio manager - might be causing pause
    // if (window.audioManager) {
    //     window.audioManager.playAttack();
    // }
}

function defeatBoss() {
    console.log('BOSS DEFEATED! Victory! - defeatBoss function called');
    console.log('MINIMAL BOSS DEFEAT - testing if this causes pause');
    
    // Immediately reset flag to prevent blocking
    bossDefeatInProgress = false;
    
    // MINIMAL CLEANUP ONLY
    console.log('Boss defeat - minimal cleanup only');
    
    // Simple victory text - no animations
    const victoryText = gameScene.add.text(player.x, player.y - 100, 'BOSS DEFEATED!', {
        fontSize: '32px',
        fill: '#00FF00',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5);
    
    // Destroy text after 2 seconds without animation
    gameScene.time.delayedCall(2000, () => {
        if (victoryText) victoryText.destroy();
    });
    
    // Clean up boss
    if (boss.healthBar) {
        boss.healthBar.destroy();
    }
    if (boss.nameLabel) {
        boss.nameLabel.destroy();
    }
    if (boss) {
        boss.destroy();
    }
    boss = null;
    bossSpawned = false;
    
    // Flag already reset at start of function
    
    // Scene should never be paused now
    console.log('Boss defeat complete - scene should be running');
    
    // Ensure game continues
    console.log('Boss cleanup complete, game should continue...');
    
    // Reset enemy counter for next boss
    enemiesDefeated = 0;
    
    // Track boss defeats
    bossesDefeated++;
    console.log(`Bosses defeated: ${bossesDefeated}`);
    
    // Heal player as reward
    playerHealth = Math.min(100, playerHealth + 30);
    console.log('Player healed! Health:', playerHealth);
    
    // Award bonus currency for boss defeat
    const bossReward = 50;
    currency += bossReward;
    console.log(`Boss reward: ${bossReward} coins! Total: ${currency}`);
    
    // Simple reward message - no animations
    const rewardText = gameScene.add.text(player.x, player.y - 50, `BOSS REWARD: ${bossReward} COINS!`, {
        fontSize: '20px',
        fill: '#FFD700',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5);
    
    // Destroy after 3 seconds
    gameScene.time.delayedCall(3000, () => {
        if (rewardText) rewardText.destroy();
    });
    
    // Force game to continue - ensure no pausing
    console.log('Boss defeat complete - game should continue normally');
    console.log('Enemies will continue spawning, press M for shop access');
    
    // CRITICAL TEST - Alert to see if game is actually paused
    setTimeout(() => {
        console.log('TEST: 2 seconds after boss defeat - game should still be running');
        if (gameScene.scene.isPaused()) {
            console.log('ERROR: Scene is paused after boss defeat!');
            console.log('FORCING SCENE RESUME...');
            gameScene.scene.resume();
        } else {
            console.log('SUCCESS: Scene is still running after boss defeat!');
        }
    }, 2000);
    
    // IMMEDIATE FORCE RESUME - don't wait
    console.log('IMMEDIATE: Forcing scene resume right now...');
    if (gameScene.scene.isPaused()) {
        gameScene.scene.resume();
        console.log('Scene was paused, forced resume');
    } else {
        console.log('Scene was not paused');
    }
    
    // NUCLEAR OPTION: Force game to continue
    forceGameContinue();
    
    // Force update the game loop to ensure it continues
    console.log('Game loop should continue running...');
}

function getEnemyCurrencyReward(enemy) {
    // Different enemies give different amounts of currency
    if (enemy.strategy) {
        const strategyName = enemy.strategy.constructor.name;
        switch (strategyName) {
            case 'AggressiveStrategy': return 5;
            case 'DefensiveStrategy': return 4;
            case 'PatrollingStrategy': return 3;
            case 'KamikazeStrategy': return 8;
            case 'SniperStrategy': return 6;
            case 'FlankerStrategy': return 7;
            case 'GuardianStrategy': return 9;
            default: return 5;
        }
    }
    return 5; // Default reward
}

function toggleMenu() {
    if (menuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    menuOpen = true;
    console.log('Opening Weapon Shop...');
    
    // Simple approach: just create the menu elements
    // Menu title
    const title = gameScene.add.text(600, 100, 'WEAPON SHOP', {
        fontSize: '32px',
        fill: '#FFD700',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5).setDepth(1000);
    
    // Currency display
    const currencyText = gameScene.add.text(600, 140, `Coins: ${currency}`, {
        fontSize: '24px',
        fill: '#FFD700',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5).setDepth(1000);
    
    // Create weapon shop items
    createWeaponShopItems();
    
    // Instructions
    const instructions = gameScene.add.text(600, 450, 'Click buttons to buy weapons and upgrades', {
        fontSize: '16px',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5).setDepth(1000);
    
    const closeText = gameScene.add.text(600, 480, 'Press M or ESC to close', {
        fontSize: '14px',
        fill: '#CCCCCC',
        stroke: '#000000',
        strokeThickness: 1
    }).setOrigin(0.5).setDepth(1000);
    
    // SIMPLE CLOSE BUTTON
    const closeButton = gameScene.add.text(600, 520, 'CLOSE MENU', {
        fontSize: '20px',
        fill: '#FF0000',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5).setDepth(1000);
    closeButton.setInteractive();
    closeButton.on('pointerdown', () => {
        console.log('CLOSE BUTTON CLICKED');
        closeMenu();
    });
}

function closeMenu() {
    console.log('closeMenu() called');
    menuOpen = false;
    console.log('Closing Weapon Shop...');
    
    // Remove all elements with depth >= 1000
    const elementsToDestroy = [];
    gameScene.children.list.forEach(child => {
        if (child.depth >= 1000) {
            elementsToDestroy.push(child);
        }
    });
    
    console.log('Found', elementsToDestroy.length, 'elements to destroy');
    
    // Destroy all menu elements
    elementsToDestroy.forEach(element => {
        console.log('Destroying element:', element.text || 'non-text element');
        element.destroy();
    });
    
    console.log('closeMenu() completed - menuOpen is now:', menuOpen);
}

function createWeaponShopItems() {
    const startY = 180;
    const itemHeight = 40;
    
    weapons.forEach((weapon, index) => {
        const y = startY + (index * itemHeight);
        const isOwned = unlockedWeapons.includes(index);
        const isFree = index < 5; // First 5 weapons are free
        
        // Weapon name and stats
        const statusText = isOwned ? '✓ OWNED' : 'LOCKED';
        const weaponText = gameScene.add.text(200, y, `${weapon.name} - Dmg: ${weapon.damage} | Range: ${weapon.range} | ${statusText}`, {
            fontSize: '16px',
            fill: isOwned ? '#FFFFFF' : '#666666',
            stroke: '#000000',
            strokeThickness: 1
        }).setDepth(1003);
        
        // Purchase/Upgrade buttons
        if (!isOwned) {
            const purchaseCost = getWeaponUnlockCost(index);
            const purchaseButton = gameScene.add.text(600, y, `Buy (${purchaseCost} coins)`, {
                fontSize: '14px',
                fill: currency >= purchaseCost ? '#00FF00' : '#FF0000',
                stroke: '#000000',
                strokeThickness: 1
            }).setOrigin(0.5).setDepth(1003);
            
            purchaseButton.setInteractive();
            purchaseButton.on('pointerdown', () => {
                if (currency >= purchaseCost) {
                    buyWeapon(index);
                    currency -= purchaseCost;
                    
                    // Screen flash for purchase
                    const flash = gameScene.add.rectangle(600, 300, 800, 500, 0x00FF00, 0.3);
                    flash.setDepth(1003);
                    gameScene.tweens.add({
                        targets: flash,
                        alpha: 0,
                        duration: 200,
                        onComplete: () => flash.destroy()
                    });
                    
                    closeMenu();
                    openMenu(); // Refresh menu
                } else {
                    // Not enough coins feedback
                    const noMoneyText = gameScene.add.text(600, y + 20, 'Not enough coins!', {
                        fontSize: '12px',
                        fill: '#FF0000',
                        stroke: '#000000',
                        strokeThickness: 1
                    }).setOrigin(0.5).setDepth(1004);
                    
                    gameScene.tweens.add({
                        targets: noMoneyText,
                        alpha: 0,
                        duration: 1000,
                        onComplete: () => noMoneyText.destroy()
                    });
                }
            });
        } else {
            // Upgrade buttons
            const upgradeDamageCost = getUpgradeCost(index, 'damage');
            const upgradeRangeCost = getUpgradeCost(index, 'range');
            const upgradeCooldownCost = getUpgradeCost(index, 'cooldown');
            
            const damageButton = gameScene.add.text(500, y, `Dmg+ (${upgradeDamageCost})`, {
                fontSize: '12px',
                fill: currency >= upgradeDamageCost ? '#00FF00' : '#FF0000',
                stroke: '#000000',
                strokeThickness: 1
            }).setDepth(1003);
            
            const rangeButton = gameScene.add.text(650, y, `Rng+ (${upgradeRangeCost})`, {
                fontSize: '12px',
                fill: currency >= upgradeRangeCost ? '#00FF00' : '#FF0000',
                stroke: '#000000',
                strokeThickness: 1
            }).setDepth(1003);
            
            const cooldownButton = gameScene.add.text(750, y, `Spd+ (${upgradeCooldownCost})`, {
                fontSize: '12px',
                fill: currency >= upgradeCooldownCost ? '#00FF00' : '#FF0000',
                stroke: '#000000',
                strokeThickness: 1
            }).setDepth(1003);
            
            // Add button interactions
            damageButton.setInteractive();
            damageButton.on('pointerdown', () => {
                if (currency >= upgradeDamageCost && weaponUpgrades[index].damage < weaponUpgrades[index].maxUpgrades) {
                    upgradeWeapon(index, 'damage');
                    currency -= upgradeDamageCost;
                    closeMenu();
                    openMenu();
                }
            });
            
            rangeButton.setInteractive();
            rangeButton.on('pointerdown', () => {
                if (currency >= upgradeRangeCost && weaponUpgrades[index].range < weaponUpgrades[index].maxUpgrades) {
                    upgradeWeapon(index, 'range');
                    currency -= upgradeRangeCost;
                    closeMenu();
                    openMenu();
                }
            });
            
            cooldownButton.setInteractive();
            cooldownButton.on('pointerdown', () => {
                if (currency >= upgradeCooldownCost && weaponUpgrades[index].cooldown < weaponUpgrades[index].maxUpgrades) {
                    upgradeWeapon(index, 'cooldown');
                    currency -= upgradeCooldownCost;
                    closeMenu();
                    openMenu();
                }
            });
        }
    });
}

function getWeaponUnlockCost(weaponIndex) {
    const baseCosts = [0, 0, 0, 0, 0, 200, 75, 100, 125]; // Cost to unlock each weapon
    return baseCosts[weaponIndex] || 50;
}

function getUpgradeCost(weaponIndex, upgradeType) {
    const currentUpgrade = weaponUpgrades[weaponIndex][upgradeType];
    return (currentUpgrade + 1) * 25; // Increasing cost
}

function buyWeapon(weaponIndex) {
    if (!unlockedWeapons.includes(weaponIndex)) {
        unlockedWeapons.push(weaponIndex);
        console.log(`Purchased ${weapons[weaponIndex].name}!`);
        
        // Visual feedback for purchase
        const purchaseEffect = gameScene.add.text(600, 300, `PURCHASED ${weapons[weaponIndex].name}!`, {
            fontSize: '24px',
            fill: '#00FF00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(1002);
        
        gameScene.tweens.add({
            targets: purchaseEffect,
            y: 250,
            alpha: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 1000,
            onComplete: () => purchaseEffect.destroy()
        });
    }
}

function unlockWeapon(weaponIndex) {
    if (!unlockedWeapons.includes(weaponIndex)) {
        unlockedWeapons.push(weaponIndex);
        console.log(`Unlocked ${weapons[weaponIndex].name}!`);
    }
}

function upgradeWeapon(weaponIndex, upgradeType) {
    if (weaponUpgrades[weaponIndex][upgradeType] < weaponUpgrades[weaponIndex].maxUpgrades) {
        weaponUpgrades[weaponIndex][upgradeType]++;
        
        // Apply upgrade to weapon
        const weapon = weapons[weaponIndex];
        switch (upgradeType) {
            case 'damage':
                weapon.damage += 1;
                break;
            case 'range':
                weapon.range += 10;
                break;
            case 'cooldown':
                weapon.cooldown = Math.max(5, weapon.cooldown - 5);
                break;
        }
        
        console.log(`Upgraded ${weapon.name} ${upgradeType}!`);
    }
}
