import { gameContainer, BLOCK_SIZE, rotateSnakeElement } from "./global.js";

// Rotates one element of the snake's body into that direction
export function rotateSnakeElementByDirection(snakeElement, snakeDirection) {
    snakeElement.style.transform = `rotate(${rotateSnakeElement[snakeDirection]}deg)`;
};

// Add one block to the gameContainer
export function addBlockToGame(infoBlock) {
    let b = createBlock(infoBlock);
    
    gameContainer.appendChild(b);
};

// Create a div with the block class and type class
export function createBlock(infoBlock) {
    let b = document.createElement("div");

    b.classList.add("block");
    b.classList.add(infoBlock.type);

    b.style.width = BLOCK_SIZE + "px";
    b.style.left = infoBlock.x + "px";
    b.style.top = infoBlock.y + "px";

    return b;
};

// Add the snake's body parts
export function addSnakeBody(positionsBodyParts) {
    positionsBodyParts.forEach((bodyPart, index) => {
        Object.assign(bodyPart, {type: "body-part"});
        
        let b = createBlock(bodyPart);

        if(index == 0 && positionsBodyParts.length > 1) {
            b.classList.add("head");
        };

        gameContainer.appendChild(b);
    });
};