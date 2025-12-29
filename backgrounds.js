import { Grid } from './grid.js';


export class Game {
    /**
     * @param {Grid} grid
     */
    constructor(grid) {
        this.grid = grid;
    }

    update() {
        // Game update logic here
    }
}

export class ConwayGame extends Game {
    constructor(grid) {
        super(grid);
    }

    update() {
    }
}