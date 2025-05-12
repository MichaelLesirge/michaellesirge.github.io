import conway from "./conway.js";
import pong from "./pong.js";
import quicksort from "./sorting.js";
import tetris from "./tetris.js";
import { randomChoice } from "./util.js";

// TODO, cycle though projects with interactive:
// Pong AI (Press keys for controls), Colored Conway (draw with mouse), 3d Cubes (that face mouse), Tetris with and without AI, Maze pathfinding (draw paths), Sorting (Hover for slow and details)

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const optionList = document.getElementById('canvas-options');

const programs = {
    "Pong": pong(canvas),
    "Conway": conway(canvas),
    "Sort": quicksort(canvas),
    "Tetris": tetris(canvas),
};

const options = Object.keys(programs);

let currentProgram = randomChoice(options);

let paused = false;

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {    
        paused = !paused;
    }
});

document.addEventListener("click", (event) => {
    if (event.target === canvas) {
        paused = !paused;
    }
});

function drawPause() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.00001)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
}

for (let option of options) {
    let button = document.createElement("button");
    button.textContent = option;
    if (option === currentProgram) {
        button.style.fontWeight = "bold";
    }
    button.onclick = () => {
        currentProgram = option;
        programs[currentProgram]();
        for (let child of optionList.children) {
            child.style.fontWeight = "normal";
        }
        button.style.fontWeight = "bold";
    };
    optionList.appendChild(button);
}


function update() {
    if (paused) {
        drawPause();
    } else {
        programs[currentProgram]();
    }
    requestAnimationFrame(update);
}

update();
