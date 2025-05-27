export class Snake {
    constructor(snakeHeadX, snakeHeadY, snakeDirection, snakeSpeed, positionsBodyParts) {
        this.snakeHeadX = snakeHeadX;
        this.snakeHeadY = snakeHeadY;
        this.snakeDirection = snakeDirection;
        this.snakeSpeed = snakeSpeed;

        // Stores the X and Y of the snake's body parts
        this.positionsBodyParts = positionsBodyParts;

        // Snake's states
        this.isSnakeInvincible = false;
    };

    addBodyPart(x, y) {
        this.positionsBodyParts.unshift({ x: x, y: y});
    };

    removeBodyPart() {
        if(this.positionsBodyParts.length) {
            this.positionsBodyParts.pop();
        };
    };

};