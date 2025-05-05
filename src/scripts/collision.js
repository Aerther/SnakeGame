export function checkCollision(elements, snakeHeadX, snakeHeadY) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].x == snakeHeadX && elements[i].y == snakeHeadY) {
            return { collided: true, index: i };
        }
    }

    return { collided: false, index: -1 };
};