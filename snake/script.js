import { context, HEIGHT, WIDTH,  CELL_SIZE, WORLD_WIDTH, WORLD_HEIGHT} from "./canvas.js";
import { state } from "./state.js";

const MOVE_INTERVAL = 500;
const ROCK_SPAWN_INTERVAL = 10000;
const SPEEDBOOST_INTERVAL = 10000;

function init() {
  state.input = {};
  state.snake = {
    moveElapsed: 0,
    length: 3,
    parts: [{ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 }],
    directory: null,
    newDirectory: { x: 0, y: -1 }
  };

  state.apple = {
    x: Math.floor(Math.random() * WORLD_WIDTH),
    y: Math.floor(Math.random() * WORLD_HEIGHT)
  };

  state.rocks = [{
    x: Math.floor(Math.random() * WORLD_WIDTH),
    y: Math.floor(Math.random() * WORLD_HEIGHT)
  }];
  state.rocksSpawnElapsed = 0;
  state.speedBoostElapsed = 0;
  state.moveInterval = MOVE_INTERVAL;
  state.countDownResult = 5;
  state.isCountingDown = false;
  state.paused = false;
  state.startGame = false;
  state.gameOver = false;
  state.score = 0;
}

function generateApple() {
  let newApple = {
    x: Math.floor(Math.random() * WORLD_WIDTH),
    y: Math.floor(Math.random() * WORLD_HEIGHT)
  };
  while ((state.snake.parts.some((part, index) => index !== 0 && newApple.x === part.x && newApple.y === part.y)) && (newApple.x === state.rocks.x && newApple.y === state.rocks.y)) {
    newApple = {
      x: Math.floor(Math.random() * WORLD_WIDTH),
      y: Math.floor(Math.random() * WORLD_HEIGHT)
    };
  }
  state.apple = newApple;
}

function togglePause(event)
{
  if (event.key === " " && state.startGame) {
    if (!state.paused)
  {
      state.paused = true;
  } else if (state.paused)
  {
     state.paused = false;
  }
  }
}

function startGame(){
  if (state.startGame === false && state.isCountingDown === false && state.input[" "]) {
      countDown();
  }
}

function countDown() {
    let countDownSeconds = 5;
    let countdown = setInterval(function() {
    countDownSeconds--;
    state.isCountingDown = true;
    state.countDownResult = countDownSeconds;
    if (countDownSeconds < 0) {
        clearInterval(countdown)
        state.startGame = true;
        state.isCountingDown = false;
      }
    }, 1000);
}

function game(dt){
  if(state.startGame) {

    if (state.gameOver) {
      if (state.input[" "]) init();
      return;
    }
    if (state.input.ArrowLeft && state.snake.dir.x !== 1) {
      state.snake.newDirectory = { x: -1, y: 0 };
    }
    else if (state.input.ArrowUp && state.snake.dir.y !== 1) {
      state.snake.newDirectory = { x: 0, y: -1 };
    }
    else if (state.input.ArrowRight && state.snake.dir.x !== -1) {
      state.snake.newDirectory = { x: 1, y: 0 };
    }
    else if (state.input.ArrowDown && state.snake.dir.y !== -1) {
      state.snake.newDirectory = { x: 0, y: 1 };
    }

    state.snake.moveElapsed += dt;
    if (state.snake.moveElapsed > state.moveInterval) {
      state.snake.dir = state.snake.newDirectory;
      state.snake.moveElapsed -= state.moveInterval;
      const newSnakePart = {
        x: state.snake.parts[0].x + state.snake.dir.x,
        y: state.snake.parts[0].y + state.snake.dir.y
      };
      state.snake.parts.unshift(newSnakePart);

      if (state.snake.parts.length > state.snake.length) {
        state.snake.parts.pop();
      }
    }

    const head = state.snake.parts[0];

    if (head.x === state.apple.x && head.y === state.apple.y) {
      state.snake.length++;
      state.score += 1;
      generateApple();
    }

    // Speedbooster
    state.speedBoostElapsed += dt;
    if (state.speedBoostElapsed > SPEEDBOOST_INTERVAL) {
      state.speedBoostElapsed -= SPEEDBOOST_INTERVAL;
      state.moveInterval = state.moveInterval - state.moveInterval * 0.1;
    }

    // World edge - it's Game over instead of respawn
    if (head.x < 0) {
      head.x = WORLD_WIDTH - 1;
    } else if (head.y < 0) {
      head.y = WORLD_HEIGHT - 1;
    } else if (head.x >= WORLD_WIDTH) {
      head.x = 0;
    } else if (head.y >= WORLD_HEIGHT) {
      head.y = 0;
    }
    
    // World egde - game over
    /*const worldEdgeIntersect = head.x < 0 || head.y < 0 || head.x >= WORLD_WIDTH || head.y >= WORLD_HEIGHT;
    if (worldEdgeIntersect) {
      state.gameOver = true;
    }*/

    // Intersect own body
    const snakePartIntersect = state.snake.parts.some((part, index) => index !== 0 && head.x === part.x && head.y === part.y);
    if (snakePartIntersect) {
      state.gameOver = true;
    }

    // Rocks
    state.rocksSpawnElapsed += dt;
    if (state.rocksSpawnElapsed > ROCK_SPAWN_INTERVAL) {
      state.rocksSpawnElapsed -= ROCK_SPAWN_INTERVAL;
      state.rocks.push({
        x: Math.floor(Math.random() * WORLD_WIDTH),
        y: Math.floor(Math.random() * WORLD_HEIGHT)
      });
    }

    // Intersect with a rock
    const rockIntersect = state.rocks.find(r => r.x === head.x && r.y === head.y)
    if (rockIntersect) {
      state.gameOver = true;
    }
  }
}

function update(dt) {
  startGame();
  game(dt);
}

function render() {
  // Text
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Background
  context.clearRect(0, 0, WIDTH, HEIGHT)
  context.fillStyle = "#021E42";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // Snake
  state.snake.parts.forEach(({ x, y }, index) => {
    if (index === 0) context.fillStyle = "#0BA071";
    else context.fillStyle = "#0e8b64";
    context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  })

  // Apple
  context.fillStyle = "#DC143C";
  context.fillRect(state.apple.x * CELL_SIZE, state.apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // Rocks
  state.rocks.forEach(({ x, y }) => {
  context.fillStyle = "#696969";
  context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  })

  // Score
  context.fillStyle = "white";
  context.font = "20px Consolas";
  context.fillText(`Score: ${state.score}`, WIDTH / 2, CELL_SIZE / 2);

  // Start Game
  if (state.startGame === false && state.countDownResult > 4) {
    context.fillStyle = "#021E42";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = "white";
    context.font = "60px Consolas";
    context.fillText("SNAKE", WIDTH / 2, HEIGHT / 2);
    context.font = "15px Consolas";
    context.fillText("Press SPACE to start the game", WIDTH / 2, HEIGHT / 2 + 40);
  }

  //CountDown
  if (state.countDownResult >= 0 && state.countDownResult <= 4) {
  context.fillStyle = "white";
  context.font = "80px Consolas";
  context.fillText(`${state.countDownResult + 1}`, WIDTH / 2, HEIGHT / 2);
  }

    // Resume
  if (state.paused) {
    context.fillStyle = "white";
    context.font = "60px Consolas";
    context.fillText("PAUSED", WIDTH / 2, HEIGHT / 2);
    context.font = "15px Consolas";
    context.fillText("Press SPACE to resume", WIDTH / 2, HEIGHT / 2 + 40);
  }

  // Game Over
  if (state.gameOver) {
    context.fillStyle = "white";
    context.font = "60px Consolas";
    context.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2);
    context.font = "15px Consolas";
    context.fillText("Press SPACE to start over", WIDTH / 2, HEIGHT / 2 + 40);
  }
}

let lastFrameTime = performance.now();
function next() {
  const currentTime = performance.now();
  let dt = currentTime - lastFrameTime;

  if(state.paused)
  { 
    dt = 0;
  } else {
    dt = currentTime - lastFrameTime;
  }
  
  update(dt);
  render();

  lastFrameTime = currentTime;

  requestAnimationFrame(next);
}

init();
next();

window.addEventListener('keydown', (event) => {
  state.input[event.key] = true;
})

window.addEventListener('keyup', (event) => {
  state.input[event.key] = false;
})

addEventListener("keyup", togglePause);