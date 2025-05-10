import * as collision from "./collision.js";

//
// Setting the data of each block in the game
//

const dataApple = {
    type: "apple",
    list: [],
    collisionFunction: collision.appleCollision
};

const dataStar = {
    type: "star",
    list: [],
    collisionFunction: collision.starCollision
};

const dataAddSpeed = {
    type: "add-speed",
    list: [],
    effect: (gameSpeed) => { return gameSpeed / 2 },
    collisionFunction: collision.speedBoostCollision
};

const dataReduceSpeed = {
    type: "reduce-speed",
    list: [],
    effect: (gameSpeed) => { return gameSpeed * 2 },
    collisionFunction: collision.speedBoostCollision
};

const dataGrass = {
    type: "grass",
    list: []
};

const dataSand = {
    type: "sand",
    list: [],
    collisionFunction: collision.sandCollision
};

const dataWater = {
    type: "water",
    list: [],
    collisionFunction: collision.waterCollision
};

const dataWall = {
    type: "wall",
    list: [],
    collisionFunction: collision.wallCollision
};

const dataFinish = {
    type: "finish",
    list: [],
    collisionFunction: collision.finishCollision
};

// Teleport is not complete added
const dataTeleport = {
    type: "teleport",
    list: [],
    collisionFunction: collision.teleportCollision
};

export const blocksData = {
    g: dataGrass,
    s: dataSand,
    w: dataWater,
    b: dataWall, // b for barrier
    f: dataFinish,
    t: dataTeleport
};

export const powerUpsData = {
    a: dataApple,
    s: dataStar,
    f: dataAddSpeed,
    r: dataReduceSpeed,
    n: {type: null, list: []}
};