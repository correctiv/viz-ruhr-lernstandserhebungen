import {COLORS, SUBJECTS} from './config.js'
import renderDivBars from './render_div_bars.js'

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

    const yLabels = [
      'kein Niveau',
      'Niveaustufe&nbsp;1',
      'Niveaustuf&nbsp;2',
      'Niveaustufe&nbsp;3',
      'Niveaustufe&nbsp;4',
      'Niveaustufe&nbsp;5',
    ]

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
          x: i || '-',
          y: data[k]
        }
      })
    }

    const sectionRows = wrapperEl.append('div').selectAll('div').data(forms).enter()
        .append('div')
          .attr('class', `${cssNamespace}__row ${cssNamespace}__row--section`)
          .html(d => `<h3>${d}</h3>`)

    // annotation for mobile display
    sectionRows.append('span')
      .attr('class', 'annotation--smaller --mobile-only')
      .text('Verteilung auf die Niveaustufen. "-" = keine Niveaustufe erreicht.')

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

  })

}
