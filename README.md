## Test custom javascript with instant navigation

Custom javascript (added using a feature flag) is not loaded when `site_url` is set
together with `features = ["navigation.instant"]`. To reproduce:
1. `make serve`
2. Open http://localhost:8000/
3. Navigate to http://localhost:8000/map/

In the browser's dev tools we can verify that
```html
<script src="../javascripts/leaflet.js" type=""></script>
<script src="../javascripts/maps_show_routs.js" type=""></script>
```
are simply not added. If we refresh the page they appear (I think instant navigation doesn't apply on page reload). 

The problem doesn't occur if we directly land on http://localhost:8000/map/ (probably because
instant navigation starts from a different state). If I unset `site_url`, instant navigation seems to work fine.
