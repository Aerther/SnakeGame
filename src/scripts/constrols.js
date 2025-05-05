import { snakeDirection } from "./global";

document.addEventListener("keydown", (e) => {
    if ((e.key == "ArrowDown" || e.key == "s") && snakeDirection != "up") {
        snakeDirection = "down";
    } else if ((e.key == "ArrowUp" || e.key == "w") && snakeDirection != "down") {
        snakeDirection = "up";
    } else if ((e.key == "ArrowRight" || e.key == "d") && snakeDirection != "left") {
        snakeDirection = "right";
    } else if ((e.key == "ArrowLeft" || e.key == "a") && snakeDirection != "right") {
        snakeDirection = "left";
    }
});