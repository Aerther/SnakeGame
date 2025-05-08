export const gameContainer = document.getElementById("container");

export const BLOCK_SIZE = 40;
export const BLOCKS_WIDTH = 21;
export const BLOCKS_HEIGHT = 15;

// Total number of blocks in the game container
export const TOTAL_BLOCK_COUNT = BLOCKS_WIDTH * BLOCKS_HEIGHT;

// Sets the rotation of the head depending on the snakeDirection (see movement)
export const rotateSnakeElement = {
    down: 180,
    up: 0,
    right: 90,
    left: 270
};

// Sets the speed of the snake
let snakeSpeed = 300;

// Initial snake head position
let snakeHeadX = BLOCK_SIZE * 2;

// Initial snake head position (centered)
let snakeHeadY = Math.floor(gameContainer.offsetHeight / 2 / BLOCK_SIZE) * BLOCK_SIZE;

// Initial snake direction
let snakeDirection;

export const snakeData = {
    snakeHeadX: snakeHeadX,
    snakeHeadY: snakeHeadY,
    snakeSpeed: snakeSpeed,
    snakeDirection: snakeDirection
};