// Stores the body parts of the snake
export let positionsBodyParts = [];

// Stores the apple positions
export let positionsApples = [];

// Stores the sand positions
export let positionsSands = [];

// Stores the water positions
export let positionsWaters = [];

// Stores the wall positions
export let positionsWalls = [];

// Stores the speed boost positions
export let positionsSpeedBoosts = [];

// Stores the finish positions
export let positionsFinish = [];

// Stores the teleport positions
export let positionsTeleports = [];

// Stores the star positions
export let positionsStars = [];

// Player states
export let isPlayerInvincible = false;

//
// Setting the data of each block in the game
//

const dataApple = {
    type: "apple",
    list: positionsApples
};

const dataStar = {
    type: "star",
    list: positionsStars
};

const dataAddSpeed = {
    type: "add-speed",
    list: positionsSpeedBoosts,
    effect: () => { speed = speed / 1.5 }
};

const dataReduceSpeed = {
    type: "reduce-speed",
    list: positionsSpeedBoosts,
    effect: () => { speed = speed * 1.5 }
};

const dataGrass = {
    type: "grass",
    list: null
};

const dataSand = {
    type: "sand",
    list: positionsSands
};

const dataWater = {
    type: "water",
    list: positionsWaters
};

const dataWall = {
    type: "wall",
    list: positionsWalls
};

const dataFinish = {
    type: "finish",
    list: positionsFinish
};

const dataTeleport = {
    type: "teleport",
    list: positionsTeleports
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
};