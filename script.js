import Grid from './grid.js';

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const testDiv = document.createElement('div');
testDiv.style.width = '1rem';
document.body.appendChild(testDiv);

function getRemSize() {
    return parseFloat(getComputedStyle(testDiv).width);
}

const grid = new Grid(ctx, getRemSize());

function updateGrid() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    grid.updateCellSize(getRemSize());

    const items = document.getElementsByClassName('item');
    for (let item of items) {        
        const rect = item.getBoundingClientRect();
        const startX = Math.floor(rect.left / grid.cellSize);
        const startY = Math.floor(rect.top / grid.cellSize);
        const endX = Math.ceil(rect.right / grid.cellSize);
        const endY = Math.ceil(rect.bottom / grid.cellSize);
        console.log(startX, startY, endX, endY);
        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                grid.block(x, y);
            }
        }
    }
}

updateGrid();
addEventListener('resize', updateGrid);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw();
    requestAnimationFrame(draw);
}

draw();