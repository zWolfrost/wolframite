function animateTextDVD(el, speed) {
	const boxRect = el.parentElement.getBoundingClientRect();
	const textRect = el.getBoundingClientRect();
	const diffX = boxRect.width - textRect.width;
	const diffY = boxRect.height - textRect.height;

	let x = 0, y = 0;
	let dx = speed, dy = speed;
	let colorIndex = 0;

	function setRandomRainbowColor(el) {
		const colors = ["#f33", "#f93", "#ff5", "#6f6", "#6ff", "#66f", "#f6f"];

		let newColorIndex = 0;

		do {
			newColorIndex = Math.floor(Math.random() * colors.length);
		} while (colorIndex == newColorIndex)

		colorIndex = newColorIndex;
		el.style.color = colors[colorIndex];
	}

	function bounceText() {
		x += dx;
		y += dy;

		if (x <= 0 || x >= diffX) {
			dx = -dx;
			setRandomRainbowColor(el);
		}
		if (y <= 0 || y >= diffY) {
			dy = -dy;
			setRandomRainbowColor(el);
		}

		if ((x <= 0 || x >= diffX) && (y <= 0 || y >= diffY)) {
			alert("DVD Logo Hit the Corner! 🎉");
		}

		el.style.left = x + "px";
		el.style.top  = y + "px";

		requestAnimationFrame(bounceText);
	}

	bounceText();
}

animateTextDVD(document.getElementById("bouncing-dvd"), 0.4);


async function fetchMinecraftServerStatus(url) {
	try {
		const res = await fetch("https://api.mcsrvstat.us/3/" + url);
		return await res.json();
	} catch {
		return null;
	}
}

fetchMinecraftServerStatus("mc.lucarusso.work").then(status => {
	const mcDesc = document.querySelector('a[href*="mc.lucarusso.work"] + label');
	mcDesc.innerHTML = status?.online ? `<b>Currently online! (${status.protocol.name})</b>. Feel free to join!` : "Currently offline.";
});
