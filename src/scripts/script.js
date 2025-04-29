const container = document.getElementById("container");

const GRID_SIZE = 50;
let speed = 300;
let fleft = GRID_SIZE * 2;
let movement = GRID_SIZE;
let ftop = Math.floor(container.offsetHeight / 2 / movement) * movement;
let side = "right";
const totalBlocks = (container.offsetHeight / GRID_SIZE) * (container.offsetWidth / GRID_SIZE);

container.style.backgroundSize = `${GRID_SIZE}px ${GRID_SIZE}px`;

let blocksPositions = [];
let applesPositions = [];
let sandsPositions = [];
let watersPositions = [];

positionBlocks(3);
addBlock(0, "sand", sandsPositions, true, false, false);
addBlock(0, "water", watersPositions, true, true, false);
addBlock(20, "apple", applesPositions, false, true, true);

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

function addBlock(quant, type, list, avoidSand, avoidWater, avoidApple) {
    if(quant > blocksLeft()) quant = blocksLeft();

    for (let i = 0; i < quant; i++) {
        let isOnSnake, isOnSand, isOnWater, isOnApple, x, y;
    
        do {
            x = Math.floor(Math.random() * (container.offsetWidth / GRID_SIZE)) * GRID_SIZE;
            y = Math.floor(Math.random() * (container.offsetHeight / GRID_SIZE)) * GRID_SIZE;

            isOnSnake = blocksPositions.some(pos => pos[1] == y && pos[0] == x);

            isOnSand = avoidSand ? sandsPositions.some(pos => pos[1] == y && pos[0] == x) : false;
            isOnWater = avoidWater ? watersPositions.some(pos => pos[1] == y && pos[0] == x) : false;
            isOnApple = avoidApple ? applesPositions.some(pos => pos[1] == y && pos[0] == x) : false;
        } while (isOnSnake || isOnSand || isOnWater || isOnApple);
    
        let b = createBlock();
        b.classList.add(type);
    
        b.style.width = GRID_SIZE + "px";
        b.style.top = y + "px";
        b.style.left = x + "px";
    
        container.appendChild(b);
    
        list.push([x, y]);
    };
}

function positionBlocks(number) {
    for (let i = 0; i < number; i++) {
        blocksPositions.push([fleft - i * movement, ftop]);
    };

    blocksPositions.forEach((position) => {
        let b = createBlock();
        b.classList.add("body-part");

        b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        b.style.width = GRID_SIZE + "px";
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
        ftop += movement;
    } else if (side == "up") {
        ftop -= movement;
    } else if (side == "right") {
        fleft += movement;
    } else if (side == "left") {
        fleft -= movement;
    };

    if (ftop < 0) ftop = 0;
    if (fleft < 0) fleft = 0;
    if (ftop >= container.offsetHeight) ftop = container.offsetHeight - movement;
    if (fleft >= container.offsetWidth) fleft = container.offsetWidth - movement;

    if(sandsPositions.some(pos => pos[0] == fleft && pos[1] == ftop)) {
        updateSpeed(speed * 3);
    } else if(watersPositions.some(pos => pos[0] == fleft && pos[1] == ftop)) {
        location.reload();
    } else {
        updateSpeed(speed);
    };

    blocksPositions.unshift([fleft, ftop]);
    blocksPositions.pop();

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
                b.style.width = GRID_SIZE + "px";
                b.style.top = tailPosition[1] + "px";
                b.style.left = tailPosition[0] + "px";

                container.appendChild(b);

                blocksPositions.push(tailPosition);
            };
        };
    });
};