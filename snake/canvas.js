export const WIDTH = 800;
export const HEIGHT = 600;

const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

// World details
export const CELL_SIZE = 30;
export const WORLD_WIDTH = Math.floor(WIDTH / CELL_SIZE);
export const WORLD_HEIGHT = Math.floor(HEIGHT / CELL_SIZE);