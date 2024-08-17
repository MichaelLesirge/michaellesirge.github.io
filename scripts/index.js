
const smallScreen = screen.width < 500;

const mainSection = document.querySelector(".body")

//Static site generator? Lame
// TODO, make all projects clickable links
const projectImagePath = "images/projects"
const sections = {
    python: [
        {
            humanReadableName: "Neural Network",
            link: "https://github.com/michaellesirge/neural-network",
            image: "neural-network.gif",
        },
        {
            humanReadableName: "Cryptography and Steganography",
            link: "https://github.com/michaellesirge/password-manager",
            image: "aes.gif",
        },
        {
            humanReadableName: "Data Structures and Algorithms",
            link: "https://github.com/michaellesirge/data-structures-and-algorithms/",
            image: "sorting.gif",
        },
        {
            humanReadableName: "Physics, Animations, Etc",
            link: "https://github.com/michaellesirge/intermediate-programming-class/tree/main/pygame-physics",
            image: "balls.gif",
        }
    ],
    web: [
        {
            humanReadableName: "Rock Paper Scissors",
            link: "https://michaellesirge.github.io/simple-web-projects/rock-paper-scissors-battle/",
            image: "rock-paper-scissors-battle.png",
        },
        {
            humanReadableName: "PID Simulation",
            link: "https://michaellesirge.github.io/simple-web-projects/pid-demo/",
            image: "pid-demo.png",
        },
        {
            humanReadableName: "Canvas Animations",
            link:"https://michaellesirge.github.io/simple-web-projects/fancy-effects/",
            image: "fancy-effects.png",
        },
        {
            humanReadableName: "Full Project List",
            link: "https://michaellesirge.github.io/simple-web-projects",
            image: "my-web-projects.png",
        },
    ],
    frc: [
        {
            humanReadableName: "2024 Crescendo",
            link: "https://github.com/redshiftrobotics/crescendo-2024",
            image: "robot.gif",
        },
        {
            humanReadableName: "Simulation",
            link: "https://github.com/michaellesirge/next-year-swerve",
            image: "advantage-scope.gif",
        }
    ],
}

for (const [name, content] of Object.entries(sections)) {
    const section = document.getElementById(name);

    const contentArea = section.querySelector(".card-container")

    for (const project of content) {
        const card = document.createElement("a");
        card.setAttribute("href", project.link)
        card.setAttribute("target", "_blank")
        card.classList.add("card");
        card.style.backgroundImage = `url(${projectImagePath}/${project.image ?? "example.png"})`;

        const title = document.createElement("span");
        title.innerText = project.humanReadableName;

        card.appendChild(title)

        contentArea.appendChild(card);
    }
}

selfLink(document.querySelector("#link-title"), smallScreen);

const pongCanvas = document.querySelector("#pong")
if (!smallScreen) pong(pongCanvas);

// --- Link Back Title ---
function selfLink(tag, shortVersion = false) {
    // Set title/link at top of page to current URL
    tag.setAttribute("href", window.location.href);
    tag.textContent = shortVersion ? window.location.host : window.location.href;
}

function isElementVisible(element) {
    const item = element.getBoundingClientRect();
    return (
        item.top >= 0 &&
        item.left >= 0 &&
        item.bottom <= (
            window.innerHeight ||
            document.documentElement.clientHeight) &&
        item.right <= (
            window.innerWidth ||
            document.documentElement.clientWidth)
    );
}

// --- Pong ---
function pong(canvas) {
    const dpr = Math.ceil(window.devicePixelRatio || 1);

    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    const ctx = canvas.getContext("2d");

    // Paddle properties
    const paddleWidth = 10;
    const paddleHeight = 100;

    const shouldReset = false;
    let done = false;

    const paddleStartY = canvas.height / 2 - paddleHeight / 2;

    let player1Y = paddleStartY;
    let player2Y = paddleStartY;

    const player1Up = "q"
    const player1Down = "a"

    const player2Up = "p"
    const player2Down = "l"

    const paddleWallGap = canvas.width * 0.01;

    const paddleSpeed = canvas.height / 100;

    // Ball properties
    const ballRadius = 10;

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
        // Draw the background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fill();
    }

    function draw() {
        // Controls
        ctx.fillStyle = "white"
        ctx.font = `${paddleWidth * 2}px monospace`
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
            const alpha = i / trailMaxLength; // Adjust trail transparency
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

        // Draw the scores
        // ctx.fillText(`Player 1: ${player1Score}`, 100, 50);
        // ctx.fillText(`Player 2: ${player2Score}`, canvas.width - 160, 50);
    }

    function update() {
        if (keys[player1Up] && paddleStartY > 0) {
            player1Y = Math.max(player1Y - paddleSpeed, 0);
            player1Moved = true;
        } else if (keys[player1Down] && paddleStartY < canvas.height - paddleHeight) {
            player1Y = Math.min(player1Y + paddleSpeed, canvas.height - paddleHeight);
            player1Moved = true;
        }

        if (keys[player2Up] && paddleStartY > 0) {
            player2Y = Math.max(player2Y - paddleSpeed, 0);
            player2Moved = true;
        } else if (keys[player2Down] && paddleStartY < canvas.height - paddleHeight) {
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

        // Ball collision with paddles. Not just inverted to to bouncing around inside paddle
        if (ballX - ballRadius * 0.25 <= paddleWidth + paddleWallGap && ballY + ballRadius > player1Y && ballY - ballRadius < player1Y + paddleHeight) {
            ballSpeedX = Math.abs(ballSpeedX)
            // ballSpeedX = -ballSpeedX;
        }

        else if (ballX + ballRadius * 0.25 >= canvas.width - paddleWidth - paddleWallGap &&
            ballY > player2Y &&
            ballY < player2Y + paddleHeight) {
            ballSpeedX = -Math.abs(ballSpeedX);
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
            // alert(`Game Over! ${player1Score > player2Score ? 'Player 1' : 'Player 2'} wins!`);
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
    }

    // Keyboard controls
    const keys = {};
    window.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });

    // Game loop
    function gameLoop() {
        update();
        clear();
        draw();
        // if (!done) requestAnimationFrame(gameLoop);
        if (!done) {
            setTimeout(gameLoop, 1000 / 60);
        }
        else {
            clear()
            if (isElementVisible(canvas)) mainSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    gameLoop();
}