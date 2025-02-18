import { makeGrid, randomFloat } from "./util.js";

export default function conway(canvas) {
	const dpr = Math.ceil(window.devicePixelRatio || 1);

	canvas.width = canvas.clientWidth * dpr;
	canvas.height = canvas.clientHeight * dpr;

	const ctx = canvas.getContext("2d");

	const gridSize = 10;

	let rows = Math.floor(canvas.height / gridSize);
	let cols = Math.floor(canvas.width / gridSize);

	const startingChanceOn = 0.3;

	function randRGB() {
		return [randomFloat(0, 255), randomFloat(0, 255), randomFloat(0, 255)];
	}

	function blendRGB(colors) {
		const colorCount = colors.length;
		let sumR = 0,
			sumG = 0,
			sumB = 0;

		for (const color of colors) {
			sumR += color[0] ** 2;
			sumG += color[1] ** 2;
			sumB += color[2] ** 2;
		}

		const blendedR = Math.sqrt(sumR / colorCount);
		const blendedG = Math.sqrt(sumG / colorCount);
		const blendedB = Math.sqrt(sumB / colorCount);

		return [blendedR, blendedG, blendedB];
	}

	function cssRGB(color) {
		return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}

	let grid, nextGrid;

	let lastMousePoint = null;

	function drawAtPoint(x, y, color) {
		if (x < 0 || y < 0 || x >= cols || y >= rows) return;
		grid[y][x] = color || randRGB();
	}

	function drawLine(x0, y0, x1, y1) {
		const dx = Math.abs(x1 - x0);
		const dy = Math.abs(y1 - y0);

		const sx = x0 < x1 ? 1 : -1;
		const sy = y0 < y1 ? 1 : -1;

		let err = dx - dy;

		while (true) {
			drawAtPoint(x0, y0);

			if (x0 === x1 && y0 === y1) break;

			const e2 = 2 * err;

			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}

			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}
	}

	canvas.addEventListener("mousemove", (e) => {
		const rect = canvas.getBoundingClientRect();
		const x = Math.floor((e.clientX - rect.left) / gridSize);
		const y = Math.floor((e.clientY - rect.top) / gridSize);

		if (lastMousePoint) {
			drawLine(lastMousePoint[0], lastMousePoint[1], x, y);
		}

		lastMousePoint = [x, y];
	});

	const DEAD = 0;

	function init() {
		rows = Math.floor(canvas.height / gridSize);
		cols = Math.floor(canvas.width / gridSize);
		grid = makeGrid(rows, cols, () => (Math.random() < startingChanceOn ? DEAD : randRGB()));
		nextGrid = makeGrid(rows, cols, () => DEAD);
		update();
	}

	function update() {
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const neighbors = getNeighbors(i, j);
				const neighborsCount = neighbors.length;

				const tile = grid[i][j];

				if (tile === DEAD && neighborsCount === 3) {
					nextGrid[i][j] = blendRGB(neighbors);
				} else if (tile !== 0 && (neighborsCount < 2 || neighborsCount > 3)) {
					nextGrid[i][j] = DEAD;
				} else {
					nextGrid[i][j] = tile;
				}
			}
		}

		[nextGrid, grid] = [grid, nextGrid];
	}

	function getNeighbors(row, col) {
		let neighbors = [];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;

				const tile = grid[(row + i + rows) % rows][(col + j + cols) % cols];

				if (tile !== 0) {
					neighbors.push(tile);
				}
			}
		}
		return neighbors;
	}

	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function draw() {
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const tile = grid[i][j];
				if (tile !== 0) {
					ctx.fillStyle = cssRGB(tile);
					ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
				}
			}
		}
	}

	init();

	return () => {
		clear();
		update();
		draw();
	};
}
