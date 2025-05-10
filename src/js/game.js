import { addBlockToGame, addSnakeBody, rotateSnakeElementByDirection, getHeadElement } from "./rendering.js";
import { powerUpsData, blocksData } from "./blocksData.js";
import { BLOCK_SIZE, snakeData } from "./global.js";
import { tickGameLoop } from "./loop.js";

// Loads the level into the game container
export function loadLevel(stageMap, bodyPartsPositions, direction) {
    snakeData.positionsBodyParts = bodyPartsPositions;

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

            let infoPowerUp = {...powerUpsData[block[0]]};
            Object.assign(infoPowerUp, {x: BLOCK_SIZE*x, y: BLOCK_SIZE*y});
            delete infoPowerUp.list;

            let infoBackground = {...blocksData[block[1]]};
            Object.assign(infoBackground, {x: BLOCK_SIZE*x, y: BLOCK_SIZE*y});
            delete infoBackground.list;

            if(infoPowerUp.type != null) {
                powerUpsData[block[0]].list.push(infoPowerUp);
                addBlockToGame(infoPowerUp);
            };

            if(infoBackground.type != "grass") {
                blocksData[block[1]].list.push(infoBackground);
            };

            addBlockToGame(infoBackground);
        };
    };
};

// Updates the game's speed
export function updatesGameSpeed(gameInterval, newGameSpeed) {
    Array.from(container.getElementsByClassName("body-part")).forEach((bodyPart) => {
        bodyPart.style.transition = `top ${newGameSpeed}ms linear, left ${newGameSpeed}ms linear`;
    });

    clearInterval(gameInterval);
    return setInterval(tickGameLoop, newGameSpeed);
};