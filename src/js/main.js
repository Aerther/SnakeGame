import { BLOCK_SIZE, BLOCKS_WIDTH, BLOCKS_HEIGHT, gameContainer, snakeData } from "./global.js";
import { loadLevel, updatesGameSpeed } from "./game.js";
import { levelNumber, levels } from "./levels.js";

gameContainer.style.width = BLOCKS_WIDTH*BLOCK_SIZE + "px";
gameContainer.style.height = BLOCKS_HEIGHT*BLOCK_SIZE + "px";
gameContainer.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;

loadLevel(levels[levelNumber].map, levels[levelNumber].snakeBodyPositions, levels[levelNumber].direction);

export let gameInterval;

document.addEventListener("keydown", () => {
    gameInterval = updatesGameSpeed(gameInterval, snakeData.snakeSpeed);
}, {once: true});

export function setGameInterval(intervalGame) {
    gameInterval = intervalGame;
};