function addBlock(type, x, y) {
    let b = createBlock();
    b.classList.add(type);
    
    b.style.width = BLOCK_SIZE + "px";
    b.style.top = y + "px";
    b.style.left = x + "px";
    
    container.appendChild(b);
};

function createBlock() {
    let b = document.createElement("div");
    b.classList.add("block");
    return b;
};

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
        };

        container.appendChild(b);
    });
};