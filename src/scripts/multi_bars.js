import {COLORS, SUBJECTS} from './config.js'
import {MULTI_BARS as data} from './data.js'
import renderDivBars from './render_div_bars.js'

export default () => {

  const cssNamespace = 'multi-bars'
  const wrapperEl = d3.select(`#${cssNamespace}`)

  const forms = {
    // overall participating data for rvr area (without wesel & duisburg)
    'Gymnasium': 12419,
    'Hauptschule': 3067,
    'Realschule': 8684,
    'Schulen des längeren gemeinsamen Lernens': 9385
  }

  const yLabels = [
    'kein&nbsp;Niveau',
    'Niveaustufe&nbsp;1',
    'Niveaustufe&nbsp;2',
    'Niveaustufe&nbsp;3',
    'Niveaustufe&nbsp;4',
    'Niveaustufe&nbsp;5',
  ].reverse()

  const columns = Object.keys(SUBJECTS).map(s => SUBJECTS[s])
  columns.splice(0, 0, null)

  const getData = form => {
    const _data = data.filter(d => d.schulform == form)
    return columns.map(c => _data.find(d => d.fach == c))
  }

  const getChartData = data => {
    return Object.keys(data).filter(k => k.indexOf('niveau') > -1 && k.indexOf('6') < 0)
      .sort().map((k, i) => {
      return {
        x: i,
        y: data[k]
      }
    }).reverse()
  }

  const sectionRows = wrapperEl.append('div').selectAll('div').data(Object.keys(forms)).enter()
      .append('div')
        .attr('class', `${cssNamespace}__row ${cssNamespace}__row--section`)
        .html(d => `<h4>${d} <span>Schüler insgesamt: ${forms[d]}</span></h4>`)

  // annotation for mobile display
  sectionRows.append('span')
    .attr('class', 'annotation--smaller --mobile-only')
    .text('Verteilung der Schüler auf die Niveaustufen. 0 = keine Niveaustufe erreicht.')

  sectionRows.call(rows => {
    columns.map(c => {
      // first columns are labels
      if (!c) {
        rows.append('div').attr('class', `${cssNamespace}__cell ${cssNamespace}__cell--labels`)
            .selectAll('span').data(yLabels).enter()
          .append('span')
            .attr('class', `${cssNamespace}__label`)
            .html(l => l)
      } else {
        rows.selectAll('div').data(d => getData(d)).enter()
          .append('div')
            .attr('class', `${cssNamespace}__cell ${cssNamespace}__cell--chart`)
          .append('div')
            // create element in which the charts will be rendered into
            .attr('id', d => d && d.chart_id)
          .append('span')
            .attr('class', 'chart-title')
            .text(d => d.fach)
      }
    })

  })

  // render bars into created divs
  data.map(d => {
    d3.select(`#${d.chart_id}`).call(element => {
      renderDivBars(element, getChartData(d))
    })
    // add labes for mobile
      .selectAll('div.divbars__bar')
    .append('span')
      .attr('class', 'multi-bars__mobile-labels --mobile-only')
      .text(d => d.x)
  })

}
