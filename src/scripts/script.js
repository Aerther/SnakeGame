const container = document.getElementById("container");

const BLOCK_SIZE = 50;
let speed = 300;
let fleft = BLOCK_SIZE * 2;
let ftop = Math.floor(container.offsetHeight / 2 / BLOCK_SIZE) * BLOCK_SIZE;
let side = "right";
const totalBlocks = (container.offsetHeight / BLOCK_SIZE) * (container.offsetWidth / BLOCK_SIZE);

container.style.backgroundSize = `${BLOCK_SIZE}px ${BLOCK_SIZE}px`;

stage1 = ["ng ng ng ng ng ng ng ng ns ng ng ng ng ng ng ng ng ng",
          "ng ng ng ng ng ng ng ng as ng ng ng ng ng ng ng ng ng",
          "ng ng ng ng ng ng ng as ns ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng nw ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng ns ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ns ns ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ns ns ag ng ng ag ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ns as ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng", 
          "ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng ng"];

stage1Body = [[9*BLOCK_SIZE, 8*BLOCK_SIZE], [9*BLOCK_SIZE, 9*BLOCK_SIZE]];

let blocksPositions = [];
let applesPositions = [];
let sandsPositions = [];
let watersPositions = [];

//positionBlocks(3);
//addBlock(0, "sand", sandsPositions, true, false, false);
//addBlock(0, "water", watersPositions, true, true, false);
//addBlock(20, "apple", applesPositions, false, true, true);

makeGame(stage1, stage1Body, "up");
function makeGame(stage, body, direction) {
    blocksPositions = body;
    fleft = stage1Body[0][0];
    ftop = stage1Body[0][1];
    side = direction;

    addBodyParts(blocksPositions);

    stage = stage.map(row => row.split(" "));

    for(let y=0; y < stage.length; y++) {
        for(let x=0; x < stage[y].length; x++) {
            let block = stage[y][x];

            if(block[0] == "a") {
                addOneBlock("apple", applesPositions, x*BLOCK_SIZE, y*BLOCK_SIZE);
            }

            if(block[1] == "g") {
                addOneBlock("grass", null, x*BLOCK_SIZE, y*BLOCK_SIZE);
            } else if(block[1] == "w") {
                addOneBlock("water", watersPositions, x*BLOCK_SIZE, y*BLOCK_SIZE);
            } else if(block[1] == "s") {
                addOneBlock("sand", sandsPositions, x*BLOCK_SIZE, y*BLOCK_SIZE);
            }
        }
    }
};

let gameInterval;

document.addEventListener("keydown", () => {
    gameInterval = setInterval(moveSnake, speed);
}, {once: true});

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowDown" && side != "up") {
        side = "down";
    } else if (e.key == "ArrowUp" && side != "down") {
        side = "up";
    } else if (e.key == "ArrowRight" && side != "left") {
        side = "right";
    } else if (e.key == "ArrowLeft" && side != "right") {
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
    list.forEach((position) => {
        let b = createBlock();
        b.classList.add("body-part");

        b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        b.style.width = BLOCK_SIZE + "px";
        b.style.top = position[1] + "px";
        b.style.left = position[0] + "px";

        container.appendChild(b);
    });
};

function addOneBlock(type, list, x, y) {
    let b = createBlock();
    b.classList.add(type);
    
    b.style.width = BLOCK_SIZE + "px";
    b.style.top = y + "px";
    b.style.left = x + "px";
    
    container.appendChild(b);
    
    try {
        list.push([x, y]);
    } catch(e) {};
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

function moveSnake() {
    if (side == "down") {
        ftop += BLOCK_SIZE;
    } else if (side == "up") {
        ftop -= BLOCK_SIZE;
    } else if (side == "right") {
        fleft += BLOCK_SIZE;
    } else if (side == "left") {
        fleft -= BLOCK_SIZE;
    };

    if((ftop < 0 || ftop > container.offsetHeight - BLOCK_SIZE) || (fleft < 0 || fleft > container.offsetWidth - BLOCK_SIZE)) {
        location.reload();
    }

    if(sandsPositions.some(pos => pos[0] == fleft && pos[1] == ftop)) {
        updateSpeed(speed * 3);
    } else if(watersPositions.some(pos => pos[0] == fleft && pos[1] == ftop)) {
        location.reload();
    } else {
        updateSpeed(speed);
    };

    blocksPositions.unshift([fleft, ftop]);
    
    if(blocksPositions.length != 1) {
        blocksPositions.pop();
    } 

    const list = Array.from(container.getElementsByClassName("body-part"));
    blocksPositions.forEach((position, index) => {
        if (blocksPositions[0][0] == position[0] && blocksPositions[0][1] == position[1] && index != 0) {
            //alert("Game Over! The snake collided with itself.");
            location.reload();
        };

        list[index].style.top = position[1] + "px";
        list[index].style.left = position[0] + "px";
    });

    applesPositions.forEach((applePosition, index) => {
        if (applePosition[0] === fleft && applePosition[1] === ftop) {
            const appleElement = Array.from(container.getElementsByClassName("apple")).find(
                (apple) => parseInt(apple.style.left) === applePosition[0] && parseInt(apple.style.top) === applePosition[1]
            );

            if (appleElement) {
                container.removeChild(appleElement);

                applesPositions.splice(index, 1);

                addBlock(1, "apple", applesPositions, false, true, true);

                const tailPosition = blocksPositions[blocksPositions.length - 1];
                let b = document.createElement("div");
                b.classList.add("body-part");

                b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
                b.style.width = BLOCK_SIZE + "px";
                b.style.top = tailPosition[1] + "px";
                b.style.left = tailPosition[0] + "px";

                container.appendChild(b);

                blocksPositions.push(tailPosition);
            };
        };
    });
};