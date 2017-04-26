import {SUBJECTS, COLORS} from './config.js'

// create small bar chart element once
const element = d3.select('#multi-maps-small-bars').append('div')
    .attr('class', 'multi-map__bars-wrapper')
  .append('div')
    .attr('class', 'multi-map__bar-chart')
    .classed('--hidden', true)
    .attr('id', 'multi-map__bar-chart')

element.append('h4')
  .attr('class', 'multi-map__bar-chart-title')
element.append('p')
  .attr('class', 'annotation--small')
  .html('Verteilung auf die Niveaustufen.<br>"-" = keine Niveaustufe erreicht.')

const filterKey = (k, s) => {
  return k.indexOf('_rel') > -1 && k.indexOf(s) > -1 && k.indexOf('risiko') < 0
}

const getChartData = data => {
  return Object.keys(data).filter(k => filterKey(k, riot.STORE.activeMap))
    .sort().reverse().map((k, i) => {
    const n = 5-i
    return {
      y: n ? n : '-',
      x: data[k]
    }
  })
}

export default data => {
  element.classed('--hidden', false)
  element.selectAll('div').remove()
  element.select('h4').text(`Ergebnisse für ${SUBJECTS[riot.STORE.activeMap]}`)

  d3.playbooks.horizontalBarChart({
    width: 300,
    height: 150,
    color: d => d.y > 1 ? COLORS[0] : '#c81455',
    elementId: 'multi-map__bar-chart',
    data: getChartData(data),
    barMargin: 5,
    margin: {
      top: 0,
      right: 0,
      left: 20,
      bottom: 0
    },
    showXAxis: false,
    showYLabel: false,
    getXDomain: () => [0, 70],
    // responsiveSvg: true,
    drawExtra: c => {
      const band = c.yScale.bandwidth()
      c.g.append('g')
          .attr('class', 'bar-labels')
          .selectAll('text')
          .data(c.data)
        .enter().append('text')
          .attr('y', d => c.yScale(d.y) + band/2)
          .attr('x', d => c.xScale(70))
          .attr('text-anchor', 'end')
          .attr('dominant-baseline', 'middle')
          .text(d => `${d.x} %`)
      }
}).render()

}
