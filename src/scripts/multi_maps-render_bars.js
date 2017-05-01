import {SUBJECTS, COLORS} from './config.js'
import renderDivBars from './render_div_bars.js'

// create small bar chart element once
const element = d3.select('#multi-maps-small-bars').append('div')
    .attr('class', 'multi-map__bars-wrapper')
  .append('div')
    .attr('class', 'multi-map__bar-chart')
    .classed('--hidden', true)
    .attr('id', 'multi-map__bar-chart')

element.append('h4')
    .attr('class', 'multi-map__bar-chart-title')
    .text('Ergebnisse')
element.append('span')
    .attr('class', 'multi-map__bar-chart-subtitle')

const filterKey = (k, s) => {
  return k.indexOf('_rel') > -1 && k.indexOf(s) > -1 && k.indexOf('risiko') < 0
}

const getChartData = data => {
  return Object.keys(data).filter(k => filterKey(k, riot.STORE.activeMap))
    .sort().map((k, i) => {
    return {
      x: i || '-',
      y: data[k]
    }
  })
}

export default data => {
  // compute data
  const _data = getChartData(data)

  // update headline
  element.select('span').text(SUBJECTS[riot.STORE.activeMap])

  if (!riot.STORE.smallBars) {
    riot.STORE.smallBars = true
    // unhide element
    element.classed('--hidden', false)
    // create the bars for the first time
    element.call(el => renderDivBars(el, _data))
        .selectAll('div.divbars__bar')
      .append('span')
        .attr('class', 'multi-map__bar-label')
        .text(d => d.x)

    // add annotation once
    element.append('p')
      .attr('class', 'annotation--small')
      .html('Verteilung auf die Niveaustufen.<br>"-" = keine Niveaustufe erreicht.')
  } else {
    // update bar widths
    element.selectAll('div.divbars__bar').data(_data)
        .style('width', d => `${d.y * 1.3}%`)  // FIXME
    element.selectAll('span.divbars__bar-label').data(_data)
        .text(d => `${Math.round(d.y)} %`)
  }

}
