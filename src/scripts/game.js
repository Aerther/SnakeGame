import { snakeDirection, snakeHeadX, snakeHeadY } from "./global";
import { BLOCK_SIZE, TOTAL_BLOCK_COUNT } from "./global";
import { updateHeadBorder } from "./movement";
import { 
    positionsBodyParts, 
    positionsApples, 
    positionsSpeedBoosts, 
    positionsStrawberries, 
    positionsFinish, 
    positionsWalls, 
    positionsSands, 
    positionsWaters, 
    positionsTeleports 
} from "./states";

export function makeGame(stageMap, bodyPartsPositions, direction) {
    // Sets the positions of the snake's body parts
    positionsBodyParts = bodyPartsPositions;

    // Sets the head x and y of the snake
    snakeHeadX = positionsBodyParts[0].x;
    snakeHeadY = positionsBodyParts[0].y;

    // Sets the direction of the snake
    snakeDirection = direction;

   // addpositionsBodyPartsrts(blocksPositions);
   // addTeleport();
    updateHeadBorder();

    // Make the stageMap be like [ [ [] ] ]
    stageMap = stageMap.map(row => row.split(" "));

    // Checks every individual block (see levels)
    for(let y=0; y < stageMap.length; y++) {
        for(let x=0; x < stageMap[y].length; x++) {
            let block = stageMap[y][x];

            let infoPowerUp = {
                x: x * BLOCK_SIZE,
                y: y * BLOCK_SIZE,
                type: null,
                list: null
            }

            let infoBackground = {
                x: x * BLOCK_SIZE,
                y: y * BLOCK_SIZE,
                type: null,
                list: null
            }

            if(block[0] == "a") {
                infoPowerUp.type = "apple";
                infoPowerUp.list = positionsApples;
            } else if(block[0] == "f") {
                infoPowerUp.type = "add-speed";
                infoPowerUp.list = positionsSpeedBoosts;
                infoPowerUp.calculateSpeed = () => {speed = speed / 1.5};
            } else if(block[0] == "r") {
                infoPowerUp.type = "reduce-speed";
                infoPowerUp.list = positionsSpeedBoosts;
                infoPowerUp.calculateSpeed = () => {speed = speed * 1.5};
            } else if(block[0] == "s") {
                infoPowerUp.type = "strawberry";
                infoPowerUp.list = positionsStrawberries;
            }

            if(block[1] == "g") {
                infoBackground.type = "grass";
                infoBackground.list = null;
            } else if(block[1] == "w") {
                infoBackground.type = "water";
                infoBackground.list = positionsWaters;
            } else if(block[1] == "s") {
                infoBackground.type = "sand";
                infoBackground.list = positionsSands;
            } else if(block[1] == "b") {
                infoBackground.type = "wall";
                infoBackground.list = positionsWalls;
            } else if(block[1] == "f") {
                infoBackground.type = "finish";
                infoBackground.list = positionsFinish;
            }

            if(infoPowerUp.type != null) {
                infoPowerUp.list.push(infoPowerUp);
                addOneBlock(infoPowerUp.type, infoPowerUp.x, infoPowerUp.y);
            }

            if(infoBackground.list != null) {
                infoBackground.list.push(infoBackground);
            }

            addOneBlock(infoBackground.type, infoBackground.x, infoBackground.y);
        }
    }
};

export function updateSpeed(interval, newSpeed) {
    Array.from(container.getElementsByClassName("bodyPartsPositions-part")).forEach((positionsBodyPartsrt) => {
        positionsBodyPartsrt.style.transition = `top ${newSpeed}ms linear, left ${newSpeed}ms linear`;
    });

    clearInterval(interval);
    interval = setInterval(moveSnake, newSpeed);
};

export function blocksLeft() {
    return TOTAL_BLOCK_COUNT;
};