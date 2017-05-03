# viz-ruhr-lernstandserhebungen

Explore data about state-wide exams in 8th grade in parts of North-Rhine Westphalia.

[See published story at correctiv.org (in german)](https://correctiv.org/blog/ruhr/artikel/2017/05/03/hauptschulen-jeder-dritte-achtklaessler-im-ruhrgebiet-nicht-fuer-arbeitsmarkt-geeignet/)

[See preview of this viz via gh-pages](https://correctiv.github.io/viz-ruhr-lernstandserhebungen/dist/)

Based on [wbkd/yet-another-webpack-es6-starterkit](https://github.com/wbkd/yet-another-webpack-es6-starterkit)

Uses [d3-playbooks-maps](https://github.com/simonwoerpel/d3-playbooks) and [d3-playbooks-riot-components](https://github.com/simonwoerpel/d3-playbooks-riot-components/)

Two viz available:
- multiple maps
- small multiple bars

## base visualization setup for correctiv cms

### javascript

```
lib/d3.v4.min.js
lib/riot.min.js
lib/d3-playbooks.maps.min.js
lib/d3-playbooks.riot-components.min.js
bundle.js
```

### styles

```
styles/bundle.css
```

## for use in correctiv cms plugins:

### multiple maps

#### html

```html
<figure class="figure -full-width" data-viz="multi-maps">
  <h2>Ergebnisse der Lernstandserhebungen in ausgewählten Städten und Kreisen in NRW</h2>
  <div class="figure__container">
    <section class="cor-viz-ls__section cor-viz-ls__multi-maps-container">
      <div class="cor-viz-ls__multi-maps" id="multi-maps">
        <div class="multi-map__legend" id="multi-maps-legend"></div>
      </div>
      <div class="cor-viz-ls__info-wrapper">
        <div class="multi-map__selector" id="multi-maps-selector"></div>
        <div class="multi-map__infobox" id="multi-maps-infobox"></div>
        <div class="multi-map__small-bars" id="multi-maps-small-bars"></div>
      </div>
      <div class="figure__credits">
        <p><strong>Daten:</strong> <a href="">Data Source</a>, eigene Berechnungen, gerundet.</p>
      </div>
    </section>
  </div>
</figure>
```

### small multiple bars

#### html

```html
<figure class="figure -full-width" data-viz="multi-bars">
  <h2>Ergebnisse der Lernstandserhebungen pro Schulform für die Städte und Kreise des Ruhrgebiets*</h2>
  <div class="figure__container">
    <section class="cor-viz-ls__section">
      <div class="multi-bars__viz-container" id="multi-bars"></div>
    </section>
  </div>
</figure>
<div class="figure__credits">
  <p><strong>Daten:</strong> <a href="">Data Source</a></p>
  <p>* ohne Kreis Wesel und Duisburg</p>
</div>
```


## Development

### Installation

```
npm install
```

### Start Dev Server

```
npm run dev
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel-loader](https://github.com/babel/babel-loader)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
* Hot Module Replacement

When you run `npm run build` we use the [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) to move the css to a separate file and included in the head of your `index.html`, so that the styles are applied before any javascript gets loaded. We disabled this function for the dev version, because the loader doesn't support hot module replacement.
