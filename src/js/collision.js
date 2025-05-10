import { updatesGameSpeed } from "./game.js";
import { snakeData } from "./global.js";

// Checks for a collision and return a json
export function detectCollision(elements, snakeHeadX, snakeHeadY) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].x == snakeHeadX && elements[i].y == snakeHeadY) {
            return { collided: true, object: elements[i], index: i };
        }
    };

    return { collided: false, object: null, index: -1 };
};

export function wallCollision() {
    location.reload();
};

export function waterCollision() {
    location.reload();
};

export function sandCollision() {
    updatesGameSpeed(snakeData.snakeSpeed * 3);
};

export function starCollision() {
    snakeData.isPlayerInvincible = true;
    setTimeout(() => {snakeData.isPlayerInvincible = false}, 3000);
};

export function finishCollision() {
    alert("You won");
};

export function speedBoostCollision() {

};

export function teleportCollision() {

};

export function appleCollision() {
    
};