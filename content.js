const projectsElement = document.querySelector(".projects");

const projects = [
	{
		title: "Neural Network",
		desc: "A simple neural network in Python with just NumPy.",
		name: "neural-network",
		url: "https://github.com/MichaelLesirge/neural-network/tree/main/neural_network",
		image: "nn-code.webp",
		section: "python",
	},
	{
		title: "Tetris game with AI",
		url: "https://github.com/MichaelLesirge/neural-network/tree/main?tab=readme-ov-file#tetris-tetris",
		name: "password-manager",
		desc: "Pygame Tetris clone controlled by a DQN agent using my neural network.",
		image: "nn-tetris.webp",
		section: "python",
	},
	{
		title: "MNIST Digit Recognizer",
		desc: "Network trained to recognize handwritten digits from the MNIST dataset, includes Tkinter GUI",
		name: "data-structures-and-algorithms",
		url: "https://github.com/MichaelLesirge/neural-network/tree/main/mnist",
		image: "neural-network.webp",
		section: "python",
	},
	{
		title: "Pong and Network Visualizer",
		name: "pygame-physics",
		desc: "Pygame pong clone with AI and human players, plus a visualizer for the smaller neural network.",
		url: "https://github.com/MichaelLesirge/neural-network/tree/main?tab=readme-ov-file#pong-and-network-visualizer-pong",
		image: "nn-pong.webp",
		section: "python",
	},
	{
		title: "Simple Web Projects",
		best: true,
		name: "simple-web-projects",
		desc: "Full collection of my plain HTML CSS JS projects",
		url: "https://michaellesirge.github.io/simple-web-projects/",
		image: "my-web-projects.webp",
		section: "web",
	},
	{
		title: "PID Simulation",
		name: "pid-demo",
		desc: "Simulation to demonstrate tuning PID controller with car, motor, and pong. ",
		url: "https://michaellesirge.github.io/simple-web-projects/pid-demo/",
		image: "pid-demo.webp",
		section: "web",
	},
	{
		title: "Battle Royale 🪨📄✂️",
		name: "conway",
		desc: "Game of Rock Paper Scissors. Very intense gameplay to watch unfold.",
		url: "https://michaellesirge.github.io/simple-web-projects/rock-paper-scissors-battle/",
		image: "battle.webp",
		section: "web",
	},
	// {
	// 	title: "Conway's Game of Life",
	// 	name: "conway",
	// 	desc: "Conway's Game of Life and Boids with colors and a few extra features",
	// 	url: "https://michaellesirge.github.io/simple-web-projects/conway/",
	// 	image: "conway.webp",
	// 	section: "web",
	// },
	{
		title: "Controller Diagram",
		name: "xbox-diagram-maker",
		desc: "Tool for custom Xbox controller diagrams. Used by robotics team.",
		url: "https://michaellesirge.github.io/simple-web-projects/xbox-diagram-maker/",
		image: "xbox-diagram.webp",
		section: "web",
	},
	{
		title: "Robot Simulation",
		name: "next-year-swerve",
		desc: "Simulation of a swerve drive robot on field and visualizer. Made in preparation for 2025 FRC season to test autonomous movement code.",
		url: "https://github.com/michaellesirge/next-year-swerve",
		image: "advantage-scope.webp",
		section: "frc",
	},
	{
		title: "2024 Crescendo",
		name: "crescendo-2024",
		desc: "Code for my team's 2024 FRC robot. Much simpler and lacks simulation.",
		url: "https://github.com/redshiftrobotics/crescendo-2024",
		image: "robot.webp",
		section: "frc",
	},
	{
		title: "2025 Reefscape",
		best: true,
		name: "reefscape-2025",
		desc: "Code for my team's 2025 FRC robot. Includes swerve drive, hardware and simulation IO layers, simulation visualizer, path planning, and more.",
		url: "https://github.com/MichaelLesirge/reefscape-2025",
		image: "2025robot.webp",
		section: "frc",
	},
	// {
	// 	title: "2026 [TBD]",
	// 	desc: "Looking forward to the 2026 FRC game!",
	// 	url: "https://info.firstinspires.org/first-age",
	// 	image: "2025swerve.webp",
	// 	section: "frc",
	// },
	{
		title: "T-Shirt Cannon",
		name: "next-year-swerve",
		desc: "Code for my team's pneumatic t-shirt cannon robot. Lots of pneumatic control systems and non-FRC hardware integration. All logic was simulated in advance to ensure safety.",
		url: "https://github.com/redshiftrobotics/t-shirt-cannon",
		image: "tshirt.webp",
		section: "frc",
	},
];

const extraProjects = [];

function createProject({ name, title, desc, section, image, ...extra }) {
	document.getElementById(section).innerHTML += `
    <a class="project" href="${extra.url ?? name ?? ""}" target="_blank">
        <img width=500 class="project-image" src="images/projects/${
			image || name.split("/")[0] + ".webp" || "example.webp"
		}" alt="Screenshot of ${title ?? "Project"}">
        <div class="info">
            <span class="title"><h3 title="${name}">${title ?? "Untitled"}</h3>${
				extra.best ? '<span class="best">Favorite</span>' : ""
			}</span>
            <p>${desc ?? ""}</p>
        </div>
    </a>
    `;
}

projects.forEach(createProject);

// hacky fix for github stats image sometimes not loading
const img = document.getElementById("github-stats");
const removeTimer = setTimeout(() => {
	img.remove();
	console.log("Removed github stats image due to load failure.");
}, 200);
img.onload = () => {
	clearTimeout(removeTimer);
}