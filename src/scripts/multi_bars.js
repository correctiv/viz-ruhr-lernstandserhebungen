import {COLORS, SUBJECTS} from './config.js'

export default () => {

  // config
  const dataUrl = './data/schulformen.csv'
  const cssNamespace = 'multi-bars'
  const wrapperEl = d3.select(`#${cssNamespace}`)

  d3.csv(dataUrl, data => {

    const forms = [
      'Gymnasium',
      'Hauptschule',
      'Realschule',
      'Schulen des längeren gemeinsamen Lernens'
    ]

    const columns = Object.keys(SUBJECTS).map(s => SUBJECTS[s])
    columns.splice(0, 0, null)

    const getData = form => {
      const _data = data.filter(d => d.schulform == form)
      return columns.map(c => c ? _data.find(d => d.fach == c) : c)
    }

    const getChartData = data => {
      const keys = Object.keys(data).filter(k => k.indexOf('niveau') > -1 && k.indexOf('6') < 0).sort().reverse()
      return keys.map(k => {
        return {
          y: k,
          x: data[k]
        }
      })
    }

    // header row
    wrapperEl.append('div')
        .attr('class', `${cssNamespace}__row ${cssNamespace}__row--header`)
        .selectAll('div').data(columns).enter()
      .append('div')
        .attr('class', `${cssNamespace}__cell`)
        .classed(`${cssNamespace}__cell--empty`, d => !d)
        .text(d => d)

    // data rows
    wrapperEl.append('div').selectAll('div').data(forms).enter()
      .append('div')
        .attr('class', `${cssNamespace}__row ${cssNamespace}__row--section`)
        .html(d => `<h3>${d}</h3>`)
      .append('div').selectAll('div').data(d => getData(d)).enter()
      .append('div')
        .attr('class', `${cssNamespace}__cell`)
        .classed(`${cssNamespace}__cell--chart`, d => d)
        .classed(`${cssNamespace}__cell--empty`, d => !d)
      .append('div')
        .attr('id', d => d && d.chart_id)

    // render charts into created divs
    data.map(d => {

      d3.playbooks.horizontalBarChart({
        elementId: d.chart_id,
        data: getChartData(d),
        color: d => d.y.indexOf('0') < 0 && d.y.indexOf('1') < 0 ? COLORS[0] : COLORS[3],
        barMargin: 10,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        showXAxis: false,
        // xScaleNice: false,
        // xTicks: 2,
        showYAxis: false,
        getXDomain: () => [0, 75],
        responsiveSvg: true,
      }).render()

    })

  })

}
