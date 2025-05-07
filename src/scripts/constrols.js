import { snakeDirection } from "./global";

// Changes the snake's direction and don't let it go the opposite way
document.addEventListener("keydown", (e) => {
    let key = e.key.toLowerCase();

    let isDown = (key == "arrowdown" || key == "s"); // Checks for down movement
    let isUp = (key == "arrowup" || key == "w"); // Checks for up movement
    let isRight = (key == "arrowright" || key == "d"); // Checks for right movement
    let isLeft = (key == "arrowleft" || key == "a"); // Checks for left movement

    if (isDown && snakeDirection !== "up") snakeDirection = "down";
    else if (isUp && snakeDirection !== "down") snakeDirection = "up";
    else if (isRight && snakeDirection !== "left") snakeDirection = "right";
    else if (isLeft && snakeDirection !== "right") snakeDirection = "left";
});