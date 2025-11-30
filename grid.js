
export default class Grid {
    constructor(ctx, cellSize) {
        this.ctx = ctx;

        this.updateCellSize(cellSize);
    }

    set(x, y, value) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.array[y][x] = value;
        } else {
            throw new Error('Grid set: Index out of bounds');
        }
    }

    get(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.array[y][x];
        } else {
            throw new Error('Grid get: Index out of bounds');
        }
    }

    updateCellSize(newCellSize) {
        this.cellSize = newCellSize;
        this.width = Math.ceil(this.ctx.canvas.width / newCellSize);
        this.height = Math.ceil(this.ctx.canvas.height / newCellSize);
        
        const newArray = Array.from({ length: this.height }, () => Array(this.width).fill(0));
        for (let y = 0; y < Math.min(this.height, this.array ? this.array.length : 0); y++) {
            for (let x = 0; x < Math.min(this.width, this.array[0] ? this.array[0].length : 0); x++) {
                newArray[y][x] = this.array[y][x];
            }
        }
        this.array = newArray;
    }

    draw() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.width; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.height * this.cellSize);
            this.ctx.stroke();
        }
        for (let y = 0; y <= this.height; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.width * this.cellSize, y * this.cellSize);
            this.ctx.stroke();
        }
    }
}