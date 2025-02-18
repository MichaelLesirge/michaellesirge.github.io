export default function pong(canvas) {

	const dpr = Math.ceil(window.devicePixelRatio || 1);

	canvas.width = canvas.clientWidth * dpr;
	canvas.height = canvas.clientHeight * dpr;

	const ctx = canvas.getContext("2d");

	// Paddle properties
	const paddleWidth = canvas.width * 0.003;
	const paddleHeight = canvas.height * 0.3;

	const shouldReset = false;
	let done = false;

	const paddleStartY = canvas.height / 2 - paddleHeight / 2;

	let player1Y = paddleStartY;
	let player2Y = paddleStartY;

	const player1Up = "q";
	const player1Down = "a";

	const player2Up = "p";
	const player2Down = "l";

	const paddleWallGap = canvas.width * 0.01;

	const paddleSpeed = canvas.height / 100;

	// Ball properties
	const ballRadius = Math.max(canvas.width * 0.005, canvas.height * 0.005, 10);

	let ballX = canvas.width / 2;
	let ballY = canvas.height / 2;

	const speedMultiple = 1.2;
	let ballSpeedX = 7 * speedMultiple;
	let ballSpeedY = 3 * speedMultiple;

	// Score
	let player1Score = 0;
	let player2Score = 0;
	const winningScore = 5;

	let player1Moved = false;
	let player2Moved = false;

	// Trail effect properties
	const trail = [];
	const trailMaxLength = 20;
	const trailSpacing = 3;
	let trailCounter = 0;

	function clear() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fill();
	}

	function draw() {
		// Controls
		ctx.fillStyle = "white";
		ctx.font = `${paddleWidth * 2}px monospace`;
		if (!player1Moved) {
			ctx.fillText(player1Up.toUpperCase(), paddleWallGap, paddleWallGap);
			ctx.fillText(player1Down.toUpperCase(), paddleWallGap, canvas.height - paddleWallGap);
		}
		if (!player2Moved) {
			ctx.fillText(player2Up.toUpperCase(), canvas.width - paddleWidth - paddleWallGap, paddleWallGap);
			ctx.fillText(player2Down.toUpperCase(), canvas.width - paddleWidth - paddleWallGap, canvas.height - paddleWallGap);
		}

		// Trail
		for (let i = 0; i < trail.length; i++) {
			const alpha = i / trailMaxLength;
			ctx.fillStyle = `rgba(0, 200, 130, ${alpha})`;
			ctx.beginPath();
			ctx.arc(trail[i].x, trail[i].y, ballRadius / 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}

		// Draw paddles
		ctx.fillStyle = "white";
		ctx.fillRect(paddleWallGap, player1Y, paddleWidth, paddleHeight);
		ctx.fillRect(canvas.width - paddleWidth - paddleWallGap, player2Y, paddleWidth, paddleHeight);

		// Draw the ball
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
	}

	function predictBallY(playerX) {
		let steps = Math.abs((playerX - ballX) / ballSpeedX);
		let predictedY = ballY + ballSpeedY * steps;

		// Account for bounces
		while (predictedY < 0 || predictedY > canvas.height) {
			if (predictedY < 0) {
				predictedY = -predictedY;
			} else if (predictedY > canvas.height) {
				predictedY = 2 * canvas.height - predictedY;
			}
		}

		return predictedY;
	}

	function aiMovePaddle(paddleY, targetY) {
		const paddleCenter = paddleY + paddleHeight / 2;
		if (targetY < paddleCenter - paddleHeight / 6) {
			return Math.max(paddleY - paddleSpeed, 0);
		} else if (targetY > paddleCenter + paddleHeight / 6) {
			return Math.min(paddleY + paddleSpeed, canvas.height - paddleHeight);
		}
		return paddleY;
	}

	function moveTowardsCenter(paddleY) {
		const centerY = canvas.height / 2 - paddleHeight / 2;
		if (paddleY < centerY - paddleSpeed) {
			return paddleY + paddleSpeed;
		} else if (paddleY > centerY + paddleSpeed) {
			return paddleY - paddleSpeed;
		}
		return paddleY;
	}

	function update() {
		// Player 1 AI control
		if (!player1Moved && ballX < canvas.width / 3) {
			if (ballSpeedX < 0) {
				// Ball moving towards player 1
				const predictedY = predictBallY(paddleWallGap + paddleWidth);
				player1Y = aiMovePaddle(player1Y, predictedY);
			} else {
				// Ball moving away from player 1
				player1Y = moveTowardsCenter(player1Y);
			}
		} else if (keys[player1Up] && player1Y > 0) {
			player1Y = Math.max(player1Y - paddleSpeed, 0);
			player1Moved = true;
		} else if (keys[player1Down] && player1Y < canvas.height - paddleHeight) {
			player1Y = Math.min(player1Y + paddleSpeed, canvas.height - paddleHeight);
			player1Moved = true;
		}

		// Player 2 AI control
		if (!player2Moved && ballX > (canvas.width * 2) / 3) {
			if (ballSpeedX > 0) {
				// Ball moving towards player 2
				const predictedY = predictBallY(canvas.width - paddleWallGap - paddleWidth);
				player2Y = aiMovePaddle(player2Y, predictedY);
			} else {
				// Ball moving away from player 2
				player2Y = moveTowardsCenter(player2Y);
			}
		} else if (keys[player2Up] && player2Y > 0) {
			player2Y = Math.max(player2Y - paddleSpeed, 0);
			player2Moved = true;
		} else if (keys[player2Down] && player2Y < canvas.height - paddleHeight) {
			player2Y = Math.min(player2Y + paddleSpeed, canvas.height - paddleHeight);
			player2Moved = true;
		}

		// Move the ball
		ballX += ballSpeedX;
		ballY += ballSpeedY;

		// Ball collision with walls
		if (ballY < ballRadius || ballY > canvas.height - ballRadius) {
			ballSpeedY = -ballSpeedY;
		}

		// Ball collision with paddles
		if (
			ballX - ballRadius <= paddleWidth + paddleWallGap &&
			ballY + ballRadius > player1Y &&
			ballY - ballRadius < player1Y + paddleHeight
		) {
			ballSpeedX = Math.abs(ballSpeedX);
			// Add some randomness to the Y speed
			ballSpeedY += (Math.random() - 0.5) * (canvas.height * 0.002);
		} else if (
			ballX + ballRadius >= canvas.width - paddleWidth - paddleWallGap &&
			ballY + ballRadius > player2Y &&
			ballY - ballRadius < player2Y + paddleHeight
		) {
			ballSpeedX = -Math.abs(ballSpeedX);
			// Add some randomness to the Y speed
			ballSpeedY += (Math.random() - 0.5) * (canvas.height * 0.002);
		}

		// Score update
		if (ballX < 0) {
			player2Score++;
			if (shouldReset) resetBall();
			else done = true;
		} else if (ballX > canvas.width) {
			player1Score++;
			if (shouldReset) resetBall();
			else done = true;
		}

		// Check for a winner
		if (player1Score >= winningScore || player2Score >= winningScore) {
			player1Score = 0;
			player2Score = 0;
		}

		// add points on trail
		trailCounter++;
		if (trailCounter > trailSpacing) {
			trail.push({ x: ballX, y: ballY });
			if (trail.length > trailMaxLength) trail.shift();
			trailCounter = 0;
		}
	}

	function resetBall() {
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		ballSpeedX = -ballSpeedX;
		ballSpeedY = (Math.random() - 0.5) * (canvas.height * 0.006);
	}

	// Keyboard controls
	const keys = {};
	document.addEventListener("keydown", (e) => {
		keys[e.key] = true;
	});

	document.addEventListener("keyup", (e) => {
		keys[e.key] = false;
	});

	// Game loop
	return () => {
		update();
		clear();
		draw();
		if (done) {
			clear();
			ctx.fillStyle = "white";
			ctx.font = `${paddleWidth * 2}px monospace`;
			ctx.textAlign = "center";
			ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 + paddleWidth);
		}
	}
}
