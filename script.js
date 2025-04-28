const container = document.getElementById("container");

const GRID_SIZE = 50;
let speed = 500;
let originalSpeed = speed;
let fleft = GRID_SIZE * 2;
let movement = GRID_SIZE;
let ftop = Math.floor(container.offsetHeight / 2 / movement) * movement;
let side = "right";

container.style.backgroundSize = `${GRID_SIZE}px ${GRID_SIZE}px`;

let blocksPositions = [];
let applesPositions = [];
let sandsPositions = [];

addApples(10);
addSands(40);
positionBlocks(3);

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
        updateSpeed();
    }
});

function updateSpeed(change = true) {
    Array.from(container.getElementsByClassName("block")).forEach((element) => {
        element.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
    });

    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, speed);

    if(change) {
        originalSpeed = speed
    }
}

function addApples(number) {
    for (let i = 0; i < number; i++) {
        let isOnSnake, width, height;
    
        do {
            width = Math.floor(Math.random() * (container.offsetWidth / GRID_SIZE)) * GRID_SIZE;
            height = Math.floor(Math.random() * (container.offsetHeight / GRID_SIZE)) * GRID_SIZE;
            isOnSnake = blocksPositions.some(pos => pos[0] === height && pos[1] === width);
        } while (isOnSnake);
    
        let b = createBlock();
        b.classList.add("apple");
    
        b.style.width = GRID_SIZE + "px";
        b.style.top = height + "px";
        b.style.left = width + "px";
    
        container.appendChild(b);
    
        applesPositions.push([width, height]);
    }
}

function addSands(number) {
    for (let i = 0; i < number; i++) {
        let isOnSnake, width, height;

        do {
            width = Math.floor(Math.random() * (container.offsetWidth / GRID_SIZE)) * GRID_SIZE;
            height = Math.floor(Math.random() * (container.offsetHeight / GRID_SIZE)) * GRID_SIZE;
            isOnSnake = blocksPositions.some(pos => pos[0] === height && pos[1] === width);
        } while (isOnSnake);

        let b = createBlock();
        b.classList.add("sand");

        b.style.width = GRID_SIZE + "px";
        b.style.top = height + "px";
        b.style.left = width + "px";

        container.appendChild(b);

        sandsPositions.push([width, height]);
    }
}

function positionBlocks(number) {
    for (let i = 0; i < number; i++) {
        blocksPositions.push([ftop, fleft - i * movement]);
    }

    blocksPositions.forEach((position) => {
        let b = createBlock();
        b.classList.add("block");

        b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
        b.style.width = GRID_SIZE + "px";
        b.style.top = position[0] + "px";
        b.style.left = position[1] + "px";

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
    }

    if (ftop < 0) ftop = 0;
    if (fleft < 0) fleft = 0;
    if (ftop >= container.offsetHeight) ftop = container.offsetHeight - movement;
    if (fleft >= container.offsetWidth) fleft = container.offsetWidth - movement;

    let onSand = false;
    if(sandsPositions.some(pos => pos[0] == fleft && pos[1] == ftop) && !onSand) {
        originalSpeed = speed;
        speed = speed * 10;
        updateSpeed(false);
        onSand = true;
    } else {
        speed = originalSpeed;
        updateSpeed();
        onSand = false;
    }

    blocksPositions.unshift([ftop, fleft]);
    blocksPositions.pop();

    const list = Array.from(container.getElementsByClassName("block"));
    blocksPositions.forEach((position, index) => {
        if (blocksPositions[0][0] == position[0] && blocksPositions[0][1] == position[1] && index != 0) {
            //alert("Game Over! The snake collided with itself.");
            location.reload();
        }

        list[index].style.top = position[0] + "px";
        list[index].style.left = position[1] + "px";
    });

    applesPositions.forEach((applePosition, index) => {
        if (applePosition[0] == fleft && applePosition[1] == ftop) {
            const appleElement = Array.from(container.getElementsByClassName("apple")).find(
                (apple) => parseInt(apple.style.left) === applePosition[0] && parseInt(apple.style.top) === applePosition[1]
            );

            if (appleElement) {
                container.removeChild(appleElement);

                applesPositions.splice(index, 1);

                addApples(1);

                const tailPosition = blocksPositions[blocksPositions.length - 1];
                let b = document.createElement("div");
                b.classList.add("block");

                b.style.transition = `top ${speed}ms linear, left ${speed}ms linear`;
                b.style.width = GRID_SIZE + "px";
                b.style.top = tailPosition[0] + "px";
                b.style.left = tailPosition[1] + "px";

                container.appendChild(b);

                blocksPositions.push([...tailPosition]);
            }
        }
    });
}