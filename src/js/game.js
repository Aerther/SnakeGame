import { addBlockToGame, addSnakeBody, rotateSnakeElementByDirection } from "./rendering.js";
import { powerUpsData, blocksData, setPositionsBodyParts } from "./states.js";
import { tickGameLoop } from "./loop.js";
import { BLOCK_SIZE, snakeData } from "./global.js";

// Loads the level into the game container
export function loadLevel(stageMap, bodyPartsPositions, direction) {
    setPositionsBodyParts(bodyPartsPositions);

    snakeData.snakeDirection = direction;

    // Sets the head x and y of the snake
    snakeData.snakeHeadX = bodyPartsPositions[0].x;
    snakeData.snakeHeadY = bodyPartsPositions[0].y;

    addSnakeBody(bodyPartsPositions);
    rotateSnakeElementByDirection(getHeadElement(), direction);

    // Checks every individual block (see levels)
    for(let y=0; y < stageMap.length; y++) {
        for(let x=0; x < stageMap[y].length; x++) {
            let block = stageMap[y][x];

            let infoPowerUp = powerUpsData[block[0]];
            Object.assign(infoPowerUp, {x: BLOCK_SIZE*x, y: BLOCK_SIZE*y})

            let infoBackground = blocksData[block[1]];
            Object.assign(infoBackground, {x: BLOCK_SIZE*x, y: BLOCK_SIZE*y})

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

// Gets the head element
export function getHeadElement() {
    return document.getElementsByClassName("head")[0];
};