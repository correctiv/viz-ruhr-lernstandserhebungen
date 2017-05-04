'use strict'

if (module.hot) {
  module.hot.accept()
}

// import 'babel-polyfill'
// classList polyfill:
// https://github.com/eligrey/classList.js
import './classList.js'

import renderMultiMaps from '../scripts/multi_maps.js'
import renderMultiBars from '../scripts/multi_bars.js'
import '../styles/index.scss'

if (d3.select('[data-viz="multi-maps"]')) {
  renderMultiMaps()
}

if (d3.select('[data-viz="multi-bars"]')) {
  renderMultiBars()
}
