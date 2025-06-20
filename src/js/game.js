import { addBlockToGame, addSnakeBody, rotateSnakeElementByDirection, getHeadElement } from "./rendering.js";
import { powerUpsData, blocksData } from "./blocksData.js";
import { BLOCK_SIZE, gameContainer, snakeData } from "./global.js";
import { tickGameLoop } from "./loop.js";
import { levels } from "./levels.js";

// Loads the level into the game container
export function loadLevel(stageMap, bodyPartsPositions, direction, snakeSpeed) {
    // Resets
    resetSnakeBody();
    resetBlockLists(powerUpsData);
    resetBlockLists(blocksData);

    gameContainer.textContent = "";

    snakeData.positionsBodyParts = Object.values(Object.assign({}, bodyPartsPositions));
    
    snakeData.snakeSpeed = snakeSpeed;

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

export function gameOver() {
    loadLevel(levels[1].map, levels[1].snakeBodyPositions, levels[1].direction, levels[1].speed);
    levels[0] = 2;
};

// Updates the game's speed
export function updatesGameSpeed(gameInterval, newGameSpeed) {
    // Updates the transition of every snake's body part
    Array.from(container.getElementsByClassName("body-part")).forEach((bodyPart) => {
        bodyPart.style.transition = `top ${newGameSpeed}ms linear, left ${newGameSpeed}ms linear`;
    });

    // Reset the game's speed and return a new one
    clearInterval(gameInterval);

    if(newGameSpeed == -1) return 0;

    return setInterval(tickGameLoop, newGameSpeed);
};

// Removes an object from his block list ( See blocksData )
export function removeFromList(blockData, ObjectParam) {
    for (let blockInfo of Object.values(blockData)) {
        if(blockInfo.type == ObjectParam.type) {
            blockInfo.list = blockInfo.list.filter(blockInfoObject => blockInfoObject.x != ObjectParam.x || blockInfoObject.y != ObjectParam.y);
        };
    };
};

// Reset the snake body
function resetSnakeBody() {
    snakeData.positionsBodyParts = [];
};

// Reset all list of blockData
function resetBlockLists(blocksObject) {
    for(let blockData of Object.values(blocksObject)) {
        blockData.list = [];
    };
};