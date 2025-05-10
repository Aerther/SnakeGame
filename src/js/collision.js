import { updatesGameSpeed } from "./game.js";
import { snakeData } from "./global.js";
import { gameInterval, setGameInterval} from "./main.js";

// Checks for a collision and return a json
export function detectCollision(elements, snakeHeadX, snakeHeadY) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].x == snakeHeadX && elements[i].y == snakeHeadY) {
            return { collided: true, object: elements[i], index: i };
        }
    };

    return { collided: false, object: null, index: -1 };
};

export function wallCollision(Object, index) {
    location.reload();
};

export function waterCollision(Object, index) {
    location.reload();
};

export function sandCollision(Object, index) {
    setGameInterval(updatesGameSpeed(gameInterval, snakeData.snakeSpeed * 2));
};

export function starCollision(Object, index) {
    snakeData.isPlayerInvincible = true;
    setTimeout(() => {snakeData.isPlayerInvincible = false;}, 3000);
};

export function finishCollision(Object, index) {
    alert("You won");
};

export function speedBoostCollision(Object, index) {
    snakeData.snakeSpeed = Object.effect(snakeData.snakeSpeed);
    setGameInterval(updatesGameSpeed(gameInterval, snakeData.snakeSpeed));
};

export function teleportCollision(Object, index) {
    
};

export function appleCollision(Object, index) {
    
};