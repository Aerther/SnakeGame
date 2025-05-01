const container = document.getElementById("container");

const BLOCK_SIZE = 40;
const widthblocks = 21;
const heightblocks = 15;
let speed = 300;
let fleft = BLOCK_SIZE * 2;
let ftop = Math.floor(container.offsetHeight / 2 / BLOCK_SIZE) * BLOCK_SIZE;
let side = "right";
const totalBlocks = (container.offsetHeight / BLOCK_SIZE) * (container.offsetWidth / BLOCK_SIZE);

container.style.width = widthblocks*BLOCK_SIZE + "px";
container.style.height = heightblocks*BLOCK_SIZE + "px";
container.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;

stage1 = ["nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb",
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb",
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb",
          "nb ng ng ag ng fg ng rg ns ns ng nb ng nw ng ng ng ng ng ng nb",
          "nb ng ng ng ng ng ng ng ns ns ng ng ng ng ng ng ng ng ng ng nb",
          "nb ng ng ng ng ng ng ng ns ns ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng nb", 
          "nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb nb"];

stage1Body = [{x: 9*BLOCK_SIZE, y: 8*BLOCK_SIZE}, {x: 9*BLOCK_SIZE, y: 9*BLOCK_SIZE}];

let blocksPositions = [];
let applesPositions = [];
let sandsPositions = [];
let watersPositions = [];
let wallsPositions = [];
let speedPositions = [];

//positionBlocks(3);
//addBlock(0, "sand", sandsPositions, true, false, false);
//addBlock(0, "water", watersPositions, true, true, false);
//addBlock(20, "apple", applesPositions, false, true, true);

makeGame(stage1, stage1Body, "up");
function makeGame(stage, body, direction) {
    blocksPositions = body;
    fleft = stage1Body[0].x;
    ftop = stage1Body[0].y;
    side = direction;

    addBodyParts(blocksPositions);

    stage = stage.map(row => row.split(" "));

    for(let y=0; y < stage.length; y++) {
        for(let x=0; x < stage[y].length; x++) {
            let block = stage[y][x];

            let infoPowerUp = {
                x: x * BLOCK_SIZE,
                y: y * BLOCK_SIZE,
                type: null,
                list: null
            }

            let infoBackground = {
                x: x * BLOCK_SIZE,
                y: y * BLOCK_SIZE
            }

            if(block[0] == "a") {
                infoPowerUp.type = "apple";
                infoPowerUp.list = applesPositions;
            } else if(block[0] == "f") {
                infoPowerUp.type = "add-speed";
                infoPowerUp.list = speedPositions;
                infoPowerUp.calculateSpeed = () => {speed = speed / 2};
            } else if(block[0] == "r") {
                infoPowerUp.type = "reduce-speed";
                infoPowerUp.list = speedPositions;
                infoPowerUp.calculateSpeed = () => {speed = speed * 2};
            }

            if(block[1] == "g") {
                infoBackground.type = "grass";
                infoBackground.list = null;
            } else if(block[1] == "w") {
                infoBackground.type = "water";
                infoBackground.list = watersPositions;
            } else if(block[1] == "s") {
                infoBackground.type = "sand";
                infoBackground.list = sandsPositions;
            } else if(block[1] == "b") {
                infoBackground.type = "wall";
                infoBackground.list = wallsPositions;
            }

            if(infoPowerUp.type != null) {
                infoPowerUp.list.push(infoPowerUp);
                addOneBlock(infoPowerUp.type, infoPowerUp.x, infoPowerUp.y);
            }

            if(infoBackground.list != null) {
                infoBackground.list.push(infoBackground);
            }

            addOneBlock(infoBackground.type, infoBackground.x, infoBackground.y);
        }
    }
};

function addOneBlock(type, x, y) {
    let b = createBlock();
    b.classList.add(type);
    
    b.style.width = BLOCK_SIZE + "px";
    b.style.top = y + "px";
    b.style.left = x + "px";
    
    container.appendChild(b);
};

let gameInterval;

document.addEventListener("keydown", () => {
    gameInterval = setInterval(moveSnake, speed);
}, {once: true});

document.addEventListener("keydown", (e) => {
    if ((e.key == "ArrowDown" || e.key == "s") && side != "up") {
        side = "down";
    } else if ((e.key == "ArrowUp" || e.key == "w") && side != "down") {
        side = "up";
    } else if ((e.key == "ArrowRight" || e.key == "d") && side != "left") {
        side = "right";
    } else if ((e.key == "ArrowLeft" || e.key == "a") && side != "right") {
        side = "left";
    } else if (e.key == " ") {
        speed = speed / 2;
        updateSpeed(speed);
    } else if (e.key == "x") {
        speed = speed * 2;
        updateSpeed(speed);
    };
});

function updateSpeed(newSpeed) {
    Array.from(container.getElementsByClassName("body-part")).forEach((element) => {
        element.style.transition = `top ${newSpeed}ms linear, left ${newSpeed}ms linear`;
    });

    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, newSpeed);
}

function blocksLeft() {
    return totalBlocks - sandsPositions.length - watersPositions.length - blocksPositions.length - applesPositions.length;
}

function addBodyParts(list) {
    list.forEach((position, index) => {
        let b = createBlock();
        b.classList.add("body-part");

        b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        b.style.width = BLOCK_SIZE + "px";
        b.style.top = position.y + "px";
        b.style.left = position.x + "px";

        if(index == 0) {
            b.classList.add("head");
        }

        container.appendChild(b);
    });
};

function addBlock(quant, type, list, avoidSand, avoidWater, avoidApple) {
    if(quant > blocksLeft()) quant = blocksLeft();

    for (let i = 0; i < quant; i++) {
        let isOnSnake, isOnSand, isOnWater, isOnApple, x, y;
    
        do {
            x = Math.floor(Math.random() * (container.offsetWidth / BLOCK_SIZE)) * BLOCK_SIZE;
            y = Math.floor(Math.random() * (container.offsetHeight / BLOCK_SIZE)) * BLOCK_SIZE;

            isOnSnake = blocksPositions.some(pos => pos[1] == y && pos[0] == x);

            isOnSand = avoidSand ? sandsPositions.some(pos => pos[1] == y && pos[0] == x) : false;
            isOnWater = avoidWater ? watersPositions.some(pos => pos[1] == y && pos[0] == x) : false;
            isOnApple = avoidApple ? applesPositions.some(pos => pos[1] == y && pos[0] == x) : false;
        } while (isOnSnake || isOnSand || isOnWater || isOnApple);
    
        let b = createBlock();
        b.classList.add(type);
    
        b.style.width = BLOCK_SIZE + "px";
        b.style.top = y + "px";
        b.style.left = x + "px";
    
        container.appendChild(b);
    
        list.push([x, y]);
    };
}

function positionBlocks(number) {
    for (let i = 0; i < number; i++) {
        blocksPositions.push([fleft - i * BLOCK_SIZE, ftop]);
    };

    blocksPositions.forEach((position) => {
        let b = createBlock();
        b.classList.add("body-part");

        b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        b.style.width = BLOCK_SIZE + "px";
        b.style.top = position[1] + "px";
        b.style.left = position[0] + "px";

        container.appendChild(b);
    });
}

function createBlock() {
    return document.createElement("div");
}

function checkCollision(list, fleft, ftop) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].x == fleft && list[i].y == ftop) {
            return { collided: true, index: i };
        }
    }

    return { collided: false, index: -1 };
}

function moveSnake() {
    let head = container.getElementsByClassName("head")[0];

    if (side == "down") {
        ftop += BLOCK_SIZE;
        head.style.transform = "rotate(180deg)";
    } else if (side == "up") {
        ftop -= BLOCK_SIZE;
        head.style.transform = "rotate(0deg)";
    } else if (side == "right") {
        head.style.transform = "rotate(90deg)";
        fleft += BLOCK_SIZE;
    } else if (side == "left") {
        head.style.transform = "rotate(270deg)";
        fleft -= BLOCK_SIZE;
    };

    /*
    if((ftop < 0 || ftop > container.offsetHeight - BLOCK_SIZE) || (fleft < 0 || fleft > container.offsetWidth - BLOCK_SIZE)) {
        location.reload();
    }
    */

    let sandCollision = checkCollision(sandsPositions, fleft, ftop);
    let speedCollision = checkCollision(speedPositions, fleft, ftop);
    let waterCollision = checkCollision(watersPositions, fleft, ftop);
    let wallCollision = checkCollision(wallsPositions, fleft, ftop);

    if(speedCollision.collided) {
        speedPositions[speedCollision.index].calculateSpeed();
        updateSpeed(speed)

        let elements = container.getElementsByClassName(speedPositions[speedCollision.index].type);

        while (elements.length > 0) {
            container.removeChild(elements[0]);
        }

        speedPositions = speedPositions.filter((e, i) => i != speedCollision.index);

    }

    if(sandCollision.collided) {
        updateSpeed(speed * 3);
    } else if(waterCollision.collided || wallCollision.collided) {
        location.reload();
    } else {
        updateSpeed(speed);
    };

    blocksPositions.unshift({ x: fleft, y: ftop });
    
    if(blocksPositions.length != 1) {
        blocksPositions.pop();
    } 

    const list = Array.from(container.getElementsByClassName("body-part"));
    blocksPositions.forEach((position, index) => {
        if (blocksPositions[0].x == position.x && blocksPositions[0].y == position.y && index != 0) {
            //alert("Game Over! The snake collided with itself.");
            location.reload();
        };

        list[index].style.top = position.y + "px";
        list[index].style.left = position.x + "px";
    });

    applesPositions.forEach((applePosition, index) => {
        if (applePosition.x === fleft && applePosition.y === ftop) {
            const appleElement = Array.from(container.getElementsByClassName("apple")).find(
                (apple) => parseInt(apple.style.left) === applePosition.x && parseInt(apple.style.top) === applePosition.y
            );

            if (appleElement) {
                container.removeChild(appleElement);

                applesPositions.splice(index, 1);

                //addBlock(1, "apple", applesPositions, false, true, true);

                const tailPosition = blocksPositions[blocksPositions.length - 1];
                let b = document.createElement("div");
                b.classList.add("body-part");

                b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
                b.style.width = BLOCK_SIZE + "px";
                b.style.top = tailPosition.y + "px";
                b.style.left = tailPosition.x + "px";

                container.appendChild(b);

                blocksPositions.push(tailPosition);
            };
        };
    });
};