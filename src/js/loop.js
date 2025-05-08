import { snakeDirection, snakeHeadX, snakeHeadY, BLOCK_SIZE} from "./global";
import { isPlayerInvincible } from "./states";
import { checkCollision } from "./collision";
import * as states from "./states";

export function tickGameLoop() {
    if (snakeDirection == "down") {
        snakeHeadX += BLOCK_SIZE;
    } else if (snakeDirection == "up") {
        snakeHeadX -= BLOCK_SIZE;
    } else if (snakeDirection == "right") {
        snakeHeadY += BLOCK_SIZE;
    } else if (snakeDirection == "left") {
        snakeHeadY -= BLOCK_SIZE;
    };

    //updateHeadBorder();
    let strawberryCollision = checkCollision(positionsStrawberries, snakeHeadY, snakeHeadX);
    let sandCollision = checkCollision(positionsSands, snakeHeadY, snakeHeadX);
    let speedCollision = checkCollision(positionsSpeedBoosts, snakeHeadY, snakeHeadX);
    let waterCollision = checkCollision(positionsWaters, snakeHeadY, snakeHeadX);
    let wallCollision = checkCollision(positionsWalls, snakeHeadY, snakeHeadX);
    let finishCollision = checkCollision(positionsFinish, snakeHeadY, snakeHeadX);
    let teleportCollision = checkCollision(positionsTeleports, snakeHeadY, snakeHeadX);

    if(strawberryCollision.collided) {
        isPlayerInvincible = true;
        setTimeout(() => {isPlayerInvincible = false}, 3000);

    } else if(speedCollision.collided) {
        positionsSpeedBoosts[speedCollision.index].calculateSpeed();
        updateSpeed(speed)

        let elements = container.getElementsByClassName(positionsSpeedBoosts[speedCollision.index].type);

        while (elements.length > 0) {
            container.removeChild(elements[0]);
        }

        positionsSpeedBoosts = positionsSpeedBoosts.filter((e, i) => i != speedCollision.index);

    } else if(teleportCollision.collided) {
        let element = positionsTeleports[teleportCollision.index];

        snakeHeadY = element.gotoX;
        snakeHeadX = element.gotoY;
    };

    if(sandCollision.collided) {
        updateSpeed(speed * 3);
    } else if(!isInvincible) {

        if(waterCollision.collided || wallCollision.collided) {
            location.reload();
        } else if(finishCollision.collided) {
            alert("you won");
        };

    } else {
        updateSpeed(speed);
    };

    blocksPositions.unshift({ x: snakeHeadY, y: snakeHeadX });
    
    if(blocksPositions.length != 1) {
        blocksPositions.pop();
    } 

    const list = Array.from(container.getElementsByClassName("body-part"));
    blocksPositions.forEach((position, index) => {
        if (blocksPositions[0].x == position.x && blocksPositions[0].y == position.y && index != 0) {
            //alert("Game Over! The snake collided with itself.");
            location.reload();
        };

        list[index].style.top = position.y + "px";
        list[index].style.left = position.x + "px";
    });

    applesPositions.forEach((applePosition, index) => {
        if (applePosition.x === snakeHeadY && applePosition.y === snakeHeadX) {
            const appleElement = Array.from(container.getElementsByClassName("apple")).find(
                (apple) => parseInt(apple.style.left) === applePosition.x && parseInt(apple.style.top) === applePosition.y
            );

            if (appleElement) {
                container.removeChild(appleElement);

                applesPositions.splice(index, 1);

                //addBlock(1, "apple", applesPositions, false, true, true);

                const tailPosition = blocksPositions[blocksPositions.length - 1];
                let b = document.createElement("div");
                b.classList.add("body-part");

                b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
                b.style.width = BLOCK_SIZE + "px";
                b.style.top = tailPosition.y + "px";
                b.style.left = tailPosition.x + "px";

                container.appendChild(b);

                blocksPositions.push(tailPosition);
            };
        };
    });
};