import { FieldState } from './field.js';
import { render } from './render.js';
import { AppState, Stage } from './state.js';

const state = new AppState();

const game = document.querySelector('#game');
const newButton = document.querySelector('#start');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const mineCountInput = document.querySelector('#mineCount');

function handleNewButtonClick() {
  const width = parseInt(widthInput.value);
  const height = parseInt(heightInput.value);
  const mineCount = parseInt(mineCountInput.value);

  if (
    widthInput.value === '' ||
    heightInput.value === '' ||
    mineCountInput.value === ''
  ) {
    alert('You must fill in the fields');
    return;
  }

  if (
    widthInput.value < 4 ||
    widthInput.value > 14 ||
    heightInput.value < 4 ||
    heightInput.value > 14
  ) {
    alert('Width and height must be between 4 and 14');
    return;
  }

  if (mineCountInput.value < 1 || mineCountInput.value > 196) {
    alert('Number of mines must be between 1 and 196');
    return;
  }

  if (mineCount >= width * height) {
    return;
  }

  state.init(width, height, mineCount);
  game.innerHTML = render(state);
}
newButton.addEventListener('click', handleNewButtonClick);

function handleFieldDoubleClick(event) {
  if (event.buttons !== 3) {
    return;
  }

  if (!event.target.matches('td')) {
    return;
  }

  if (state.stage !== Stage.PLAYING) {
    return;
  }

  const td = event.target;
  const tr = td.parentNode;
  const x = td.cellIndex;
  const y = tr.rowIndex;

  const neighborCount = state.board[y][x].neighborCount;
  const flagsNearby = state.countFlagsNearby(x, y);

  if (flagsNearby === neighborCount) {
    state.board[y][x].neighborCount = 0;
    state.board[y][x].state = FieldState.UNREVEALED;
    state.reveal(x, y);
    state.board[y][x].neighborCount = neighborCount;
  }

  state.checkForVictory();

  game.innerHTML = render(state);
}
game.addEventListener('mousedown', handleFieldDoubleClick);

function handleFieldLeftClick() {
  if (!event.target.matches('button')) {
    return;
  }

  if (state.stage !== Stage.PLAYING) {
    return;
  }

  const td = event.target.parentNode;
  const tr = td.parentNode;
  const x = td.cellIndex;
  const y = tr.rowIndex;

  state.reveal(x, y);
  state.checkForVictory();

  game.innerHTML = render(state);
}

game.addEventListener('click', handleFieldLeftClick);

function handleFieldRightClick(event) {
  event.preventDefault();

  if (!event.target.matches('button')) {
    return;
  }
  if (state.stage !== Stage.PLAYING) {
    return;
  }

  const td = event.target.parentNode;
  const tr = td.parentNode;
  const x = td.cellIndex;
  const y = tr.rowIndex;

  state.toggleFlag(x, y);

  game.innerHTML = render(state);
}

game.addEventListener('contextmenu', handleFieldRightClick);
