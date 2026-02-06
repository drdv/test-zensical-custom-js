// coordinates are assumed to be in lat-lng (required by leaflet)
function createMap(id) {
	if (document$._loadedMaps[id]) {
		processData(id, document$._loadedMaps[id])
	} else {
		fetch(`/routes/${id}.json`)
			.then(response => response.json())
			.then(data => {
				// Save for later
				document$._loadedMaps[id] = data
				processData(id, data)
			})
	}
}

function processData(id, data) {
	const center = data.center;
	const zoom = data.zoom;
	const coordinates = data.coordinates;
	const start = coordinates.at(0);
	const end = coordinates.at(-1);
	const loop = start[0] === end[0] && start[1] === end[1];

	const map = L.map(id).setView(center, zoom);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 21,
	}).addTo(map);

	L.polyline(coordinates, {
		color: 'blue',
		weight: 3,
	}).addTo(map);

	if (loop) {
		L.circleMarker(start, {
			radius: 10,
			color: 'red',
			fillColor: 'green',
			fillOpacity: 1
		})
			.addTo(map)
			.bindPopup(`<div style="text-align:center"> Start/End<br>${start.toString()}</div>`)
			.openPopup();
	} else {
		L.circleMarker(end, {
			radius: 8,
			color: 'red'
		})
			.addTo(map)
			.bindPopup(`<div style="text-align:center"> End<br>${end.toString()}</div>`)
			.openPopup();

		L.circleMarker(start, {
			radius: 8,
			color: 'green'
		})
			.addTo(map)
			.bindPopup(`<div style="text-align:center"> Start<br>${start.toString()}</div>`)
			.openPopup();
	}
}

console.log("--- here ---");

if (!document$._mapLoaded) {
	document$._mapLoaded = true
	document$._loadedMaps = {}

	document$.subscribe(() => {
		document.querySelectorAll(".custom-map").forEach(el => {
			createMap(el.id);
		});
	});
}
