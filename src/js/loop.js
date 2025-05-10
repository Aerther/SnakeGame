import { rotateSnakeElementByDirection, getHeadElement } from "./rendering.js";
import * as blocksData from "./blocksData.js";
import { detectCollision } from "./collision.js";
import { snakeData, BLOCK_SIZE } from "./global.js";

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

    // Checks for the collisions

    Object.values(blocksData.blocksData).forEach((blockData, index) => {
        let collisionObject = detectCollision(blockData.list, snakeData.snakeHeadX, snakeData.snakeHeadY);

        
        if(collisionObject.collided) {
            collisionObject.object.collisionFunction();
        };

    });

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