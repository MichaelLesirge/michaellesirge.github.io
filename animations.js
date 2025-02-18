import conway from "./conway.js";
import pong from "./pong.js";
import quicksort from "./sorting.js";
import { randomChoice } from "./util.js";

// TODO, cycle though projects with interactive:
// Pong AI (Press keys for controls), Colored Conway (draw with mouse), 3d Cubes (that face mouse), Tetris with and without AI, Maze pathfinding (draw paths), Sorting (Hover for slow and details)

const canvas = document.getElementById('canvas');
const optionList = document.getElementById('canvas-options');

const programs = {
    "Pong": pong(canvas),
    "Conway": conway(canvas),
    "Sort": quicksort(canvas)
};

const options = Object.keys(programs);

let currentProgram = randomChoice(options);

for (let option of options) {
    let button = document.createElement("button");
    button.textContent = option;
    if (option === currentProgram) {
        button.style.fontWeight = "bold";
    }
    button.onclick = () => {
        currentProgram = option;
        for (let child of optionList.children) {
            child.style.fontWeight = "normal";
        }
        button.style.fontWeight = "bold";
    };
    optionList.appendChild(button);
}


function update() {
    programs[currentProgram]();
    requestAnimationFrame(update);
}

update();
