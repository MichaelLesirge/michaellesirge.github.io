const projectsElement = document.querySelector(".projects");

const projects = [
	{
		title: "Neural Network  🤖🔗",
		desc: "A simple neural network implementation in Python from scratch. Includes a few projects where I use network.",
		name: "neural-network",
		url: "https://github.com/michaellesirge/neural-network",
		image: "neural-network.gif",
		section: "python",
	},
	{
		title: "Cryptography and Steganography  🔒🖼️",
		url: "https://github.com/michaellesirge/password-manager",
		name: "password-manager",
		desc: "AES encryption and image steganography implementation in Python",
		image: "aes.gif",
		section: "python",
	},
	{
		title: "Data Structures and Algorithms  📚🔍",
		desc: "A collection of data structures and algorithms implemented in Python",
		name: "data-structures-and-algorithms",
		url: "https://github.com/michaellesirge/data-structures-and-algorithms/",
		image: "sorting.gif",
		section: "python",
	},
	{
		title: "Physics, Animations, Etc 🎮🔬",
		name: "pygame-physics",
		desc: "Physics simulations using Pygame, part of intermediate programming class",
		url: "https://github.com/michaellesirge/intermediate-programming-class/tree/main/pygame-physics",
		image: "balls.gif",
		section: "python",
	},
	{
		title: "Simple Web Projects 🌐🗂️",
		name: "simple-web-projects",
		desc: "Full collection of my plain HTML CSS JS projects",
		url: "https://michaellesirge.github.io/simple-web-projects/",
		image: "my-web-projects.png",
		section: "web",
	},
	{
		title: "Canvas Animations ⭐🎨",
		name: "fancy-effects",
		desc: "Collection of canvas animations with plain Javascript",
		url: "https://michaellesirge.github.io/simple-web-projects/fancy-effects/",
		image: "fancy-effects.png",
		section: "web",
	},
	{
		title: "PID Simulation 🤖📈",
		name: "pid-demo",
		desc: "Simulation to demonstrate the use of a PID controller, for robotics",
		url: "https://michaellesirge.github.io/simple-web-projects/pid-demo/",
		image: "pid-demo.png",
		section: "web",
	},
	{
		title: "Conway's Game of Life 🧬🎮",
		name: "conway",
		desc: "Conway's Game of Life and Boids with colors and a few extra features",
		url: "https://michaellesirge.github.io/simple-web-projects/conway/",
		image: "conway.png",
		section: "web",
	},
	{
		title: "2024 Crescendo 🎵🎮",
		name: "crescendo-2024",
		desc: "Code for my teams 2024 FRC robot",
		url: "https://github.com/redshiftrobotics/crescendo-2024",
		image: "robot.gif",
		section: "frc",
	},
	{
		title: "2025 Reefscape 🐠🎮",
		name: "reefscape-2025",
		desc: "Code for my teams 2025 FRC robot, current in progress",
		url: "https://githib.com/redshiftrobotics/reefscape-2025",
		image: "2025swerve.gif",
		section: "frc",
	},
	{
		title: "Robot Simulation 🤖📈",
		name: "next-year-swerve",
		desc: "Simulation of a swerve drive robot for 2025 FRC season",
		url: "https://github.com/michaellesirge/next-year-swerve",
		image: "advantage-scope.gif",
		section: "frc",
	},
];

const extraProjects = [];

function createProject({ name, title, desc, section, image, ...extra }) {
	document.getElementById(section).innerHTML += `
    <a class="project" href="${extra.url ?? name ?? ""}" target="_blank">
        <img width=500 class="project-image" src="images/projects/${
			image || name.split("/")[0] + ".png" || "example.png"
		}" alt="Screenshot of ${title ?? "Project"}">
        <div class="info">
            <span class="title"><h3 title="${name}">${title ?? "Untitled"}</h3></span>
            <p>${desc ?? ""}</p>
        </div>
    </a>
    `;
}

projects.forEach(createProject);
