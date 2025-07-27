import { BLOCK_SIZE, BLOCKS_WIDTH, BLOCKS_HEIGHT, gameContainer, snakeData } from "./global.js";
import { loadLevel, updatesGameSpeed } from "./game.js";
import { levels } from "./levels.js";
import { updateGameInfo } from "./rendering.js";

gameContainer.style.width = BLOCKS_WIDTH*BLOCK_SIZE + "px";
gameContainer.style.height = BLOCKS_HEIGHT*BLOCK_SIZE + "px";
gameContainer.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;

let levelNumber = levels[0];
loadLevel(levels[levelNumber].map, levels[levelNumber].snakeBodyPositions, levels[levelNumber].direction, levels[levelNumber].speed);
snakeData.snakeSpeed = levels[levelNumber].speed;

updateGameInfo(snakeData.positionsBodyParts.length, levels[0], levels[1].speed/snakeData.snakeSpeed);

export let gameInterval;

document.addEventListener("keydown", () => {
    if(snakeData.isLevelLoading == true) {
        gameInterval = updatesGameSpeed(gameInterval, snakeData.snakeSpeed);
        snakeData.isLevelLoading = false;
    };
});

export function setGameInterval(intervalGame) {
    gameInterval = intervalGame;
};