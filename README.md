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

Now I see the following [note in the docs](https://zensical.org/docs/setup/navigation/)
(probably this means that if `site_url` is not set, instant navigation is disabled and
that's why the problem disapears):

"Note that you must set `site_url` when using instant navigation, as instant navigation
relies on the generated `sitemap.xml` which will be empty if this setting is omitted."
