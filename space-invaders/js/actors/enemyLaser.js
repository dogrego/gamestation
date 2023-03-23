import { context } from '../canvas.js';
import { state } from '../state.js';

export class EnemyLaser {
  constructor(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.vy = state.LASER_MAX_SPEED;

    this.image = new Image();
    this.image.src = 'img/laser-red-5.png';
    this.render(context);

    this.width = this.image.width / 2;
    this.height = this.image.height / 2;

    this.audio = new Audio('sound/sfx-laser1.ogg');
    //this.audio.play();
  }

  render(context) {
    context.save();
    context.translate(this.x, this.y);
    context.drawImage(
      this.image,
      this.positionX - this.width / 2,
      this.positionY - this.height * 1.3,
      this.width,
      this.height
    );
    context.restore();
  }

  update(dt) {
    this.positionY += this.vy * dt;
  }

  isOutOfCanvas() {
    return this.positionY > context.height + this.height;
  }
}
