document$.subscribe(async () => {
    console.log("subscribe event executed")
    // This is set in the overrides per page
    if (!MAPS_ENABLED) {
        return
    }

    // Load required scripts here to assure everything is loaded
    // Once loaded it will stay loaded until the tab is closed
    // No need to add the scripts in the zensical.toml and main.html
    //
    // It's important to keep in mind the absolute path starting with /
    // The absolute path needs to be readjusted if it's hosted in GitHub pages
    // under some /repo-name/
    //
    // Personally I prefer this approach, but it requires maintenance if the root
    // path changes
    await import("/javascripts/leaflet.js")
    await import("/javascripts/show_map_routes.js")

    document.querySelectorAll(".custom-map").forEach(el => {
        window.createMap(el.id);
    });
});