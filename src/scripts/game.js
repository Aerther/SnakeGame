import { snakeDirection, snakeHeadX, snakeHeadY, BLOCK_SIZE, TOTAL_BLOCK_COUNT} from "./global";
import { updateHeadBorder } from "./movement";
import { powerUpsData, blocksData } from "./states";

export function loadLevel(stageMap, bodyPartsPositions, direction) {
    // Sets the positions of the snake's body parts
    positionsBodyParts = bodyPartsPositions;

    // Sets the head x and y of the snake
    snakeHeadX = positionsBodyParts[0].x;
    snakeHeadY = positionsBodyParts[0].y;

    // Sets the direction of the snake
    snakeDirection = direction;

   // addbodyParts(blocksPositions);
   // addTeleport();
    //updateHeadBorder();

    // Make the stageMap be like [ [ [] ] ]
    stageMap = stageMap.map(row => row.split(" "));

    // Checks every individual block (see levels)
    for(let y=0; y < stageMap.length; y++) {
        for(let x=0; x < stageMap[y].length; x++) {
            let block = stageMap[y][x];

            let infoPowerUp = powerUpsData[block[0]];

            let infoBackground = blocksData[block[1]];

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
    Array.from(container.getElementsByClassName("body-part")).forEach((bodyPart) => {
        bodyPart.style.transition = `top ${newSpeed}ms linear, left ${newSpeed}ms linear`;
    });

    clearInterval(interval);
    return setInterval(moveSnake, newSpeed);
};

export function blocksLeft() {
    return TOTAL_BLOCK_COUNT;
};