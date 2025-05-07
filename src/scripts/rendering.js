import { gameContainer, snakeSpeed, BLOCK_SIZE } from "./global";

// Add one block to the gameContainer
export function addBlockToGame(x, y, type) {
    let b = createBlock(x, y, type);
    
    gameContainer.appendChild(b);
};

// Create a div with the block class and type class
export function createBlock(x, y, type) {
    let b = document.createElement("div");

    b.classList.add("block");
    b.classList.add(type);

    b.style.width = BLOCK_SIZE + "px";
    b.style.left = x + "px";
    b.style.top = y + "px";

    return b;
};

// Add the snake's body parts
export function addSnakeBody(positionsBodyParts) {
    positionsBodyParts.forEach((bodyPart, index) => {
        let b = createBlock(bodyPart.x, bodyPart.y, "body-part");

        b.style.transition = `top ${snakeSpeed}ms linear, left ${snakeSpeed}ms linear`;

        if(index == 0 && positionsBodyParts.length > 1) {
            b.classList.add("head");
        };

        gameContainer.appendChild(b);
    });
};