function animateTextDVD(el, speed) {
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
		let boxRect = el.parentElement.getBoundingClientRect();
		let textRect = el.getBoundingClientRect();
		let diffX = boxRect.width - textRect.width;
		let diffY = boxRect.height - textRect.height;

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

		if (x > diffX + speed || y > diffY + speed) {
			x = y = 0
			dx = dy = speed
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
	mcDesc.innerHTML = status?.online ? `<b>Currently online! (${status.protocol.name})</b>. Feel free to join! The password is "mc.lr"` : "Currently offline.";
});



async function updateHiCount(add = false) {
	try {
		const res = await fetch("https://dynamite.lucarusso.work/api/misc/count?add=" + (add ? "1" : "0"));
		const data = await res.json();

		const hiCount = data.counter;
		if (hiCount) document.getElementById("hi-count").innerText = hiCount;
	} catch {
		return null;
	}
}

updateHiCount();
document.getElementById("hi-button").addEventListener("click", () => updateHiCount(true));
