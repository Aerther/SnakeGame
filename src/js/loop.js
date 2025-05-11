import { rotateSnakeElementByDirection, getHeadElement } from "./rendering.js";
import { detectCollision } from "./collision.js";
import { snakeData, BLOCK_SIZE } from "./global.js";
import { updatesGameSpeed } from "./game.js";
import { gameInterval, setGameInterval } from "./main.js";
import * as blocksData from "./blocksData.js";

export function tickGameLoop() {
    if (snakeData.snakeDirection == "down") {
        snakeData.snakeHeadY += BLOCK_SIZE;
    } else if (snakeData.snakeDirection == "up") {
        snakeData.snakeHeadY -= BLOCK_SIZE;
    } else if (snakeData.snakeDirection == "right") {
        snakeData.snakeHeadX += BLOCK_SIZE;
    } else if (snakeData.snakeDirection == "left") {
        snakeData.snakeHeadX -= BLOCK_SIZE;
    };

    rotateSnakeElementByDirection(getHeadElement(), snakeData.snakeDirection);
    setGameInterval(updatesGameSpeed(gameInterval, snakeData.snakeSpeed));

    // Checks for the collisions

    for (let blockData of Object.values(blocksData.blocksData)) {
        let collisionObject = detectCollision(blockData.list, snakeData.snakeHeadX, snakeData.snakeHeadY);
    
        if (collisionObject.collided) {
            collisionObject.object.collisionFunction(collisionObject.object, collisionObject.index);
            break;
        };
    };

    for (let blockData of Object.values(blocksData.powerUpsData)) {
        let collisionObject = detectCollision(blockData.list, snakeData.snakeHeadX, snakeData.snakeHeadY);
    
        if (collisionObject.collided) {
            collisionObject.object.collisionFunction(collisionObject.object, collisionObject.index);
            break;
        };
    };

    snakeData.positionsBodyParts.unshift({ x: snakeData.snakeHeadX, y: snakeData.snakeHeadY });
    
    if(snakeData.positionsBodyParts.length != 1) {
        snakeData.positionsBodyParts.pop();
    };

    let bodyPartsElements = Array.from(container.getElementsByClassName("body-part"));
    snakeData.positionsBodyParts.forEach((bodyPart, index) => {
        if (snakeData.snakeHeadX == bodyPart.x && snakeData.snakeHeadY == bodyPart.y && index != 0) {
            //alert("Game Over! The snake collided with itself.");
            location.reload();
        };

        bodyPartsElements[index].style.top = bodyPart.y + "px";
        bodyPartsElements[index].style.left = bodyPart.x + "px";
    });
};