import { context, WIDTH } from '../canvas.js';
import { state, PlayerStates } from '../state.js';
import { Laser } from '../actors/laser.js';

export class Player {
  constructor(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.playerMove = PlayerStates.IDLE;
    this.vx = 0;

    this.image = new Image();
    this.image.src = './img/player-blue-1.png';

    this.width = this.image.width / 2.3;
    this.height = this.image.height / 2.3;

    this.render(context);
  }

  clamp(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  shoot() {
    let laser = new Laser(state.player.positionX, state.player.positionY);
    state.lasers.push(laser);
    state.playerCooldown = state.LASER_COOLDOWN;
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
    if (state.playerMove === PlayerStates.IDLE) {
      this.vx = 0;
    } else if (state.playerMove === PlayerStates.MOVE_LEFT) {
      this.vx = -1 * state.PLAYER_MAX_SPEED;
    } else if (state.playerMove === PlayerStates.MOVE_RIGHT) {
      this.vx = state.PLAYER_MAX_SPEED;
    }
    this.positionX += dt * this.vx;
    this.positionX = this.clamp(
      this.positionX,
      this.width * 0.5,
      WIDTH - this.width * 0.5
    );

    if (state.isShooting && state.playerCooldown <= 0) {
      this.shoot();
    }
  }
}
