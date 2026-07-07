function animateTextDVD(el, speed) {
	let x = 0, y = 0;
	let dx = speed, dy = speed;
	let colorIndex = 0;
	let textIsLocked = true

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

		if (textIsLocked) {
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
		}

		el.style.transform = `translate(${x}px, ${y}px)`;

		requestAnimationFrame(bounceText);
	}

	bounceText();
	setRandomRainbowColor(el);

	document.getElementById("noclick-badge").addEventListener("click", () => {
		textIsLocked = false;
		el.parentElement.style.borderColor = "transparent";
	});
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

fetchMinecraftServerStatus("mc.wolframite.cc").then(status => {
	const mcDesc = document.querySelector('a[href*="mc.wolframite.cc"] + label');
	mcDesc.innerHTML = status?.online ? `<b>Currently online! (${status.protocol.name})</b>. Feel free to join, the password is "mc.wlf"` : "Currently offline.";
});



document.getElementById("star").addEventListener("click", e => {
	MUSIC = [
		"https://deltarune.wiki/images/Deltarune_piano_collections_by_trevor_alan_gomes_music.ogg"
	]

	AUDIO_EL = document.createElement("audio");
	AUDIO_EL.src = MUSIC[Math.floor(Math.random() * MUSIC.length)];
	AUDIO_EL.volume = 0.2;
	AUDIO_EL.autoplay = true;

	e.target.replaceWith(AUDIO_EL);
});
