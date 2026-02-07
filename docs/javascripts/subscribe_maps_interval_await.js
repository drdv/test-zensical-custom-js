document$.subscribe(async () => {
	console.log("subscribe event executed");
	// This is set in the overrides per page
	if (!MAPS_ENABLED) {
		return;
	}

	// Generated with ChatGPT
	function waitForWindowValue(
		name,
		{ interval = 50, timeout = 10000 } = {}
	) {
		return new Promise((resolve, reject) => {
			const start = performance.now();

			function check() {
				if (window[name]) {
					resolve();
					return;
				}

				if (performance.now() - start > timeout) {
					reject(new Error(`Timed out waiting for window.${name}`));
					return;
				}

				setTimeout(check, interval);
			}

			check();
		});
	}

	// Wait until it's loaded
	// The files will be added per the logic in the overrides
	// Check comment there in main.html
	await waitForWindowValue("L")
	await waitForWindowValue("createMap")

	if (!window.L || !window.createMap) {
		return
	}

	document.querySelectorAll(".custom-map").forEach((el) => {
		createMap(el.id);
	});
});
