import { context, HEIGHT, WIDTH } from './canvas.js';
import { GameStages, state } from './state.js';
import { Player } from './actors/player.js';
import { Enemy } from './actors/enemy.js';
import { handleKeyDown } from './events/keydown.js';
import { handleKeyUp } from './events/keyup.js';
import { rectIntersect } from './events/rectIntersect.js';

function init() {
  state.player = new Player(WIDTH / 2, HEIGHT - 50);
  state.playerCooldown = 0;
  state.isShooting = false;
  state.lasers = [];
  state.enemies = [];
  state.enemyLasers = [];
  state.lastFrameTime = Date.now();
  state.game_stage = GameStages.WAIT_TO_START;

  for (let i = 0; i < state.ENEMIES_PER_ROW; i++) {
    const x = i * state.ENEMY_SPACING + state.ENEMY_HORIZONTAL_PADDING;
    for (let j = 0; j < state.ENEMY_ROWS; j++) {
      const y = state.ENEMY_VERTICAL_PADDING + j * state.ENEMY_VERTICAL_SPACING;
      state.enemies.push(new Enemy(x, y));
    }
  }
  state.player.render(context);
  for (const enemy of state.enemies) {
    enemy.render(context);
  }
  showText();
}

function showText() {
  context.fillStyle = 'white';
  if (state.game_stage === GameStages.WAIT_TO_START) {
    context.font = '60px Consolas';
    context.fillText('START', WIDTH / 2.4, HEIGHT / 2);
    context.font = '15px Consolas';
    context.fillText(
      'Press ANY KEY to start the game',
      WIDTH / 2.8,
      HEIGHT / 2 + 40
    );
  } else if (state.game_stage === GameStages.WIN) {
    context.font = '60px Consolas';
    context.fillText('YOU WON', WIDTH / 2.8, HEIGHT / 2);
  } else if (state.game_stage === GameStages.GAME_OVER) {
    context.font = '60px Consolas';
    context.fillText('GAME OVER', WIDTH / 3, HEIGHT / 2);
  }
}

function startGame() {
  if (state.game_stage === GameStages.WAIT_TO_START) {
    state.game_stage = GameStages.IN_GAME;
    window.requestAnimationFrame(update);
  }
}

function update() {
  // context.webkitImageSmoothingEnabled = false;
  // context.mozImageSmoothingEnabled = false;
  // context.imageSmoothingEnabled = false;

  let currentTime = Date.now();
  state.dt = (currentTime - state.lastFrameTime) / 1000;

  context.clearRect(0, 0, WIDTH, HEIGHT);

  state.player.update(state.dt);

  for (const enemyLaser of state.enemyLasers) {
    enemyLaser.update(state.dt);
    enemyLaser.render(context);
    if (enemyLaser.isOutOfCanvas()) {
      let index = state.enemyLasers.indexOf(enemyLaser);
      state.enemyLasera.splice(index, 1);
    }
  }

  for (const enemy of state.enemies) {
    enemy.update(state.dt);
    enemy.render(context);
  }

  for (const laser of state.lasers) {
    laser.update(state.dt);
    laser.render(context);
    if (laser.isOutOfCanvas()) {
      let index = state.lasers.indexOf(laser);
      state.lasers.splice(index, 1);
    }
  }

  for (let i = 0; i < state.lasers.length; i++) {
    for (let j = 0; j < state.enemies.length; j++) {
      if (state.enemies[j].isDead) continue;
      if (rectIntersect(state.lasers[i], state.enemies[j])) {
        state.lasers.splice(i, 1);
        state.enemies.splice(j, 1);
        break;
      }
    }
  }
  if (state.enemies.length === 0) {
    state.game_stage = GameStages.WIN;
  }

  for (let i = 0; i < state.enemyLasers.length; i++) {
    if (rectIntersect(state.player, state.enemyLasers[i])) {
      state.game_stage = GameStages.GAME_OVER;
    }
  }

  state.lastFrameTime = Date.now();
  state.playerCooldown -= state.dt;
  state.player.render(context);

  if (
    state.game_stage === GameStages.WIN ||
    state.game_stage === GameStages.GAME_OVER
  ) {
    showText();
    return;
  }
  window.requestAnimationFrame(update);
}

init();

window.addEventListener('keyup', startGame);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
