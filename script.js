const text = document.getElementById("bouncing-dvd");
const box = document.getElementById("bouncing-dvd-container");

let x = 0, y = 0;
let dx = 0.4, dy = 0.4;
let colorIndex = -1;

function nextRainbowColors() {
	const colors = [
		"#ff3737ff",
		"#ff9a34ff",
		"#ffff54ff",
		"#66FF66",
		"#66FFFF",
		"#6666FF",
		"#FF66FF"
	];

	colorIndex = (colorIndex + 1) % colors.length;
	return colors[colorIndex];
}

function animate() {
	const boxRect = box.getBoundingClientRect();
	const textRect = text.getBoundingClientRect();

	x += dx;
	y += dy;

	if (x <= 0 || x + textRect.width >= boxRect.width) {
		dx = -dx;
		text.style.color = nextRainbowColors();
	}
	if (y <= 0 || y + textRect.height >= boxRect.height) {
		dy = -dy;
		text.style.color = nextRainbowColors();
	}

	text.style.left = x + "px";
	text.style.top  = y + "px";
	requestAnimationFrame(animate);
}

animate();