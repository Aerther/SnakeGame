import { BLOCK_SIZE } from "./global.js";

// Used to know which level we are
let levelNumber = 1;

// Level 1
const mapLevel1 = [
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"],
    ["nb", "ns", "ns", "ns", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ns", "ns", "ns", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "nb", "nb", "ns", "ns", "ns", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb"],
    ["nb", "ng", "ng", "ng", "ag", "ag", "ag", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "ng", "ng", "ng", "ag", "ag", "ag", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"],
    ["nb", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "ng", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb"],
    ["nb", "ng", "ng", "ng", "rg", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "fg", "ng", "ng", "ng", "ng", "ng", "nf", "nb"],
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"]
];
  
const bodyLevel1 = [
    { x: 18*BLOCK_SIZE, y: 9*BLOCK_SIZE }, 
    { x: 19*BLOCK_SIZE, y: 9*BLOCK_SIZE }, 
    { x: 19*BLOCK_SIZE, y: 10*BLOCK_SIZE }
];

const level1 = {
    map: mapLevel1,
    snakeBodyPositions: bodyLevel1,
    direction: "left",
    name: "Level 1",
    speed: 300
};

const mapLevel2 = [
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"],
    ["nb", "ns", "ns", "ns", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ns", "ns", "ns", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "nb", "nb", "ns", "ns", "ns", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb"],
    ["nb", "ng", "ng", "ng", "ag", "ag", "ag", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "ng", "ng", "ng", "ag", "ag", "ag", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"],
    ["nb", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "ng", "nb", "ng", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "ng", "nb", "nb", "nb", "ng", "nb"],
    ["nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "nb", "ng", "ng", "ng", "ng", "ng", "nb", "ng", "nb", "ng", "ng", "ng", "nb"],
    ["nb", "ng", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "ng", "nb", "ng", "nb", "nb", "nb"],
    ["nb", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "ng", "nf", "nb"],
    ["nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb", "nb"]
];
  
const bodyLevel2 = [
    { x: 18*BLOCK_SIZE, y: 9*BLOCK_SIZE }, 
    { x: 19*BLOCK_SIZE, y: 9*BLOCK_SIZE }, 
    { x: 19*BLOCK_SIZE, y: 10*BLOCK_SIZE }
];

const level2 = {
    map: mapLevel2,
    snakeBodyPositions: bodyLevel2,
    direction: "left",
    name: "Level 2",
    speed: 300
};

export const levels = {
    0: levelNumber,
    1: level1,
    2: level2
}