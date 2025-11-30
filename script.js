import Grid from './grid.js';

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createRemSizeSupplier() {
    const testDiv = document.createElement('div');
    testDiv.style.width = '1rem';
    document.body.appendChild(testDiv);
    return () => parseFloat(getComputedStyle(testDiv).width);
}

const getRemSize = createRemSizeSupplier();

const grid = new Grid(ctx, getRemSize());

function updateGrid() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    grid.updateCellSize(getRemSize());
}

addEventListener('resize', () => {
    updateGrid();
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw();
}

draw();