import { WIDTH } from './canvas.js';

const PLAYER_MAX_SPEED = 550;

const LASER_MAX_SPEED = 300;
const LASER_COOLDOWN = 0.4;
const ENEMY_COOLDOWN = 5.0;

const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;
const ENEMIES_PER_ROW = 10;
const ENEMY_ROWS = 3;
const ENEMY_SPACING =
  (WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);

let game_stage,
  player,
  playerMove,
  playerCooldown,
  enemyCooldown,
  isShooting,
  lasers,
  enemies,
  enemyLasers,
  lastFrameTime,
  dt;

export const state = {
  PLAYER_MAX_SPEED,
  LASER_MAX_SPEED,
  LASER_COOLDOWN,
  ENEMY_COOLDOWN,
  ENEMY_HORIZONTAL_PADDING,
  ENEMY_VERTICAL_PADDING,
  ENEMY_VERTICAL_SPACING,
  ENEMIES_PER_ROW,
  ENEMY_ROWS,
  ENEMY_SPACING,
  game_stage,
  player,
  playerMove,
  playerCooldown,
  enemyCooldown,
  isShooting,
  lasers,
  enemies,
  enemyLasers,
  lastFrameTime,
  dt,
};

export const GameStages = {
  WAIT_TO_START: 'WAIT_TO_START',
  IN_GAME: 'IN_GAME',
  WIN: 'WIN',
  GAME_OVER: 'GAME_OVER',
};

export const AllowedKeys = {
  KEY_CODE_A: 65,
  KEY_CODE_D: 68,
  KEY_CODE_LEFT: 37,
  KEY_CODE_RIGHT: 39,
  KEY_CODE_SPACE: 32,
};

export const PlayerStates = {
  IDLE: 'IDLE',
  MOVE_LEFT: 'MOVE_LEFT',
  MOVE_RIGHT: 'MOVE_RIGHT',
};

export function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}
