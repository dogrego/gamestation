import { context } from '../canvas.js';
import { state } from '../state.js';
import { rand } from '../state.js';
import { EnemyLaser } from './enemyLaser.js';

export class Enemy {
  constructor(x, y) {
    this.positionX = x;
    this.positionY = y;

    this.image = new Image();
    this.image.src = './img/enemy-blue-1.png';
    this.render(context);

    this.width = this.image.width / 2.3;
    this.height = this.image.height / 2.3;
    this.cooldown = rand(0.5, state.ENEMY_COOLDOWN);
  }

  shoot() {
    let enemyLaser = new EnemyLaser(this.positionX, this.positionY);
    state.enemyLasers.push(enemyLaser);
  }

  render(context) {
    context.save();
    context.translate(this.x, this.y);
    context.drawImage(
      this.image,
      this.positionX - this.width / 2,
      this.positionY - this.height / 2,
      this.width,
      this.height
    );

    context.restore();
  }

  update(dt) {
    const dx = Math.sin(state.lastFrameTime / 1000.0) * 0.5;
    const dy = Math.cos(state.lastFrameTime / 1000.0) * 0.1;
    this.positionX += dx;
    this.positionY += dy;
    this.cooldown -= dt;
    if (this.cooldown <= 0) {
      this.shoot();
      this.cooldown = rand(0.5, state.ENEMY_COOLDOWN) + state.ENEMY_COOLDOWN;
    }
  }
}
