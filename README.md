# simple-viz-startkit

A wrapper around [this wrapper](https://github.com/simonwoerpel/d3-playbooks) to render simple `d3`-powered viz fitting into [correctiv.org](https://correctiv.org/)'s article layout.

## new `cmsPlugin`-instance:

**init js**

```html
<script>
  renderViz(%id%);
</script>
```

## base visualisation setup

**javascript**

(only include what you need)

```
lib/d3.v4.min.js
lib/topojson.v2.min.js
lib/riot.min.js
lib/d3-playbooks.base.min.js
lib/d3-playbooks.maps.min.js
lib/d3-playbooks.riot-components.min.js
viz.min.js
```

**styles**

```
style.min.css
```

**html**

(remove unused elements like `selector` or `infobox`)

```html
<figure class="cor-viz figure -paragraph-width">
  <div class="cor-viz cor-viz__container figure__container">
    <div class="cor-viz cor-viz__chart d3-playbooks" id="cor-viz__chart--%id%"></div>
    <figcaption class="cor-viz cor-viz__figcaption-wrapper figure__caption">
      <div class="figure__title"><p>Legend Title</p></div>
      <div class="cor-viz cor-viz__legend" id="cor-viz__legend--%id%"></div>
      <div class="cor-viz cor-viz__selector" id="cor-viz__selector--%id%"></div>
      <div class="cor-viz cor-viz__infobox" id="cor-viz__infobox--%id%"></div>
      <div class="figure__credits">
        <p><strong>Daten:</strong> <a href="">Data Source</a></p>
      </div>
    </figcaption>
  </div>
</figure>
```

## development / build

Start your preferred local web server and browse `./index.html` (and edit accordingly) to see preview of your viz.

### install build deps

`npm install`

### build js and css for deployment

`npm run build`

### watch and build js and css during development

`npm run dev`
