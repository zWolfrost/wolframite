function animateTextDVD(el, speed) {
	const boxRect = el.parentElement.getBoundingClientRect();
	const textRect = el.getBoundingClientRect();
	const diffX = boxRect.width - textRect.width;
	const diffY = boxRect.height - textRect.height;

	let x = 0, y = 0;
	let dx = speed, dy = speed;
	let colorIndex = 0;

	function setNextRainbowColor(el) {
		const colors = [
			"#ff3737",
			"#ff9a34",
			"#ffff54",
			"#66ff66",
			"#66ffff",
			"#6666ff",
			"#ff66ff"
		];

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

		let changed = 0;

		if (x <= 0 || x >= diffX) {
			changed++;
			dx = -dx;
			setNextRainbowColor(el);
		}
		if (y <= 0 || y >= diffY) {
			changed++;
			dy = -dy;
			setNextRainbowColor(el);
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


async function minecraftServerStatus(url) {
	try {
		const res = await fetch("https://api.mcsrvstat.us/3/" + url);
		return await res.json();
	} catch {
		return null;
	}
}

minecraftServerStatus("mc.lucarusso.work").then(status => {
	const mcDesc = document.querySelector('a[href*="mc.lucarusso.work"] + label');
	mcDesc.innerHTML = status?.online ? `<b>Currently online! (${status.protocol.name})</b>. Feel free to join!` : "Currently offline.";
});
