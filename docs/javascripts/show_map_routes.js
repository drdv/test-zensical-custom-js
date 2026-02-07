// coordinates are assumed to be in lat-lng (required by leaflet)
window.createMap = function (id) {
    // fetch uses "no-cache" mode, which doesn't cache in Zenscial localhost
    // but GitHub Pages or other proper server should use browser cache for
    // these requests, so there is no need for own cache logic
    fetch(`/routes/${id}.json`)
    .then(response => response.json())
    .then(data => {
        processData(id, data)
    })
    // TODO maybe this should be asyc or not, depending on the amount of maps
    // on a given page. Did not test the performance of many maps on a single page
}

window.processData = function (id, data) {
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

console.log("--- show_map_routes ---");