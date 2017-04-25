'use strict'

if (module.hot) {
  module.hot.accept()
}

// import 'babel-polyfill'
import renderMultiMaps from '../scripts/multi_maps.js'
import renderMultiBars from '../scripts/multi_bars.js'
import '../styles/index.scss'

renderMultiMaps()
renderMultiBars()
