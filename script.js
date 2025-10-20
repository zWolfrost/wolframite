function animateTextDVD(el, speed) {
	let x = 0, y = 0;
	let dx = speed, dy = speed;
	let colorIndex = -1;

	function getNextRainbowColor() {
		const colors = [
			"#ff3737",
			"#ff9a34",
			"#ffff54",
			"#66ff66",
			"#66ffff",
			"#6666ff",
			"#ff66ff"
		];

		colorIndex = (colorIndex + 1) % colors.length;
		return colors[colorIndex];
	}

	function bounceText() {
		const boxRect = el.parentElement.getBoundingClientRect();
		const textRect = el.getBoundingClientRect();

		x += dx;
		y += dy;

		let changed = 0;

		if (x <= 0 || x + textRect.width >= boxRect.width) {
			changed++;
			dx = -dx;
			el.style.color = getNextRainbowColor();
		}
		if (y <= 0 || y + textRect.height >= boxRect.height) {
			changed++;
			dy = -dy;
			el.style.color = getNextRainbowColor();
		}

		if (changed >= 2) {
			alert("DVD Logo Hit the Corner! 🎉");
		}

		el.style.left = x + "px";
		el.style.top  = y + "px";
		requestAnimationFrame(bounceText);
	}

	bounceText();
}

animateTextDVD(document.getElementById("bouncing-dvd"), 0.4);
