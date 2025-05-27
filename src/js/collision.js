import { loadLevel, removeFromList, updatesGameSpeed } from "./game.js";
import { snakeData } from "./global.js";
import { gameInterval, setGameInterval} from "./main.js";
import { removeBlock } from "./rendering.js";
import * as blocksData from "./blocksData.js";
import { levels } from "./levels.js";

// Checks for a collision and return a json
export function detectCollision(elements, snakeHeadX, snakeHeadY) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].x == snakeHeadX && elements[i].y == snakeHeadY) {
            return { collided: true, object: elements[i], index: i };
        }
    };

    return { collided: false, object: null, index: -1 };
};

export function wallCollision(ObjectParam, index) {
    if(snakeData.isPlayerInvincible) return;

    location.reload();
};

export function waterCollision(ObjectParam, index) {
    if(snakeData.isPlayerInvincible) return;
    
    location.reload();
};

export function sandCollision(ObjectParam, index) {
    setGameInterval(updatesGameSpeed(gameInterval, snakeData.snakeSpeed * 2));
};

export function starCollision(ObjectParam, index) {
    snakeData.isPlayerInvincible = true;
    setTimeout(() => {snakeData.isPlayerInvincible = false;}, 3000);
};

export function finishCollision(ObjectParam, index) {
    setGameInterval(0);
    let levelNumber = levels[0];
    let nextLevel = levels[levelNumber];
    
    loadLevel(nextLevel.map, nextLevel.snakeBodyPositions, nextLevel.direction);
};

export function speedBoostCollision(ObjectParam, index) {
    snakeData.snakeSpeed = ObjectParam.effect(snakeData.snakeSpeed);
    setGameInterval(updatesGameSpeed(gameInterval, snakeData.snakeSpeed));

    removeFromList(blocksData.powerUpsData, ObjectParam);

    removeBlock(ObjectParam);
};

export function teleportCollision(ObjectParam, index) {
    
};

export function appleCollision(ObjectParam, index) {
    
};