import {SUBJECTS, COLORS} from './config.js'

const subjects = Object.keys(SUBJECTS).map(k => {
  return {
    key: k,
    name: SUBJECTS[k],
    chart_id: `${k}__bar-chart`
  }
})

const elements = d3.select('#multi-maps-small-bars').append('div')
    .attr('class', 'multi-map__bars-wrapper')
    .selectAll('div').data(subjects).enter()
  .append('div')
    .attr('class', 'multi-map__bar-chart')
    .classed('--hidden', true)
    .attr('id', d => d.chart_id)
    .html(d => `<h4>${d.name}</h4>`)

const filterKey = (k, s) => {
  return k.indexOf('_rel') > -1 && k.indexOf(s) > -1 && k.indexOf('risiko') < 0
}

const getChartData = data => {
  const _data = {}
  for (let subject of subjects) {
    _data[subject.key] = Object.keys(data).filter(k => filterKey(k, subject.key))
      .sort().reverse().map(k => {
      return {
        y: k,
        x: data[k]
      }
    })
  }
  return _data
}

export default data => {
  elements.classed('--hidden', false)
  elements.selectAll('div').remove()
  const chartData = getChartData(data)

  subjects.map(s => {

    d3.playbooks.horizontalBarChart({
      width: 300,
      height: 100,
      color: d => d.y.indexOf('0') < 0 && d.y.indexOf('1') < 0 ? COLORS[0] : COLORS[3],
      elementId: s.chart_id,
      data: chartData[s.key],
      margin: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      showXAxis: false,
      showYAxis: false,
      getXDomain: () => [0, 75]
    }).render()

  })

}
