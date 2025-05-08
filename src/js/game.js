import { snakeDirection, snakeHeadX, snakeHeadY, TOTAL_BLOCK_COUNT } from "./global";
import { addBlockToGame, addSnakeBody, rotateSnakeElementByDirection } from "./rendering";
import { powerUpsData, blocksData, positionsBodyParts } from "./states";
import { tickGameLoop } from "./loop";

// Loads the level into the game container
export function loadLevel(stageMap, bodyPartsPositions, direction) {
    positionsBodyParts = bodyPartsPositions;

    snakeDirection = direction;

    // Sets the head x and y of the snake
    snakeHeadX = positionsBodyParts[0].x;
    snakeHeadY = positionsBodyParts[0].y;

    rotateSnakeElementByDirection(positionsBodyParts[0], direction);
    addSnakeBody(positionsBodyParts);

    // Checks every individual block (see levels)
    for(let y=0; y < stageMap.length; y++) {
        for(let x=0; x < stageMap[y].length; x++) {
            let block = stageMap[y][x];

            let infoPowerUp = powerUpsData[block[0]];

            let infoBackground = blocksData[block[1]];

            if(infoPowerUp.type != null) {
                infoPowerUp.list.push(infoPowerUp);
                addBlockToGame(infoPowerUp)
            };

            if(infoBackground.list != null) {
                infoBackground.list.push(infoBackground);
            };

            addBlockToGame(infoBackground);
        };
    };
};

// Updates the snake's speed
export function setSnakeSpeed(gameInterval, newSnakeSpeed) {
    Array.from(container.getElementsByClassName("body-part")).forEach((bodyPart) => {
        bodyPart.style.transition = `top ${newSnakeSpeed}ms linear, left ${newSnakeSpeed}ms linear`;
    });

    clearInterval(gameInterval);
    return setInterval(tickGameLoop, newSnakeSpeed);
};