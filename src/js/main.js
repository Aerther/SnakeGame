import { updateSnakeSpeed } from "./game";
import { snakeSpeed } from "./global";

makeGame(stage1, stage1Body, "left");

container.style.width = widthblocks*BLOCK_SIZE + "px";
container.style.height = heightblocks*BLOCK_SIZE + "px";
container.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;

let gameInterval;

document.addEventListener("keydown", () => {
    gameInterval = updateSnakeSpeed(gameInterval, snakeSpeed);
}, {once: true});