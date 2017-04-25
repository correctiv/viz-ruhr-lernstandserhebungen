const color = ['#f9c280', '#dfad71', '#c59962', '#ab8454', '#917045', '#775b36', '#5e4728']
const subjects = {
  math: 'Mathe',
  german: 'Deutsch',
  english_listen: 'Englisch (Hören)',
  english_read: 'Englisch (Lesen)'
}

// multiple maps
window.renderMultiMaps = () => {

  // options
  const dataUrl = './data/data.csv'
  const geoDataUrl = './data/rvr_districts.topo.json'
  const wrapperId = 'multi-maps'
  const cssNamespace = 'multi-map'
  const legendId = '#multi-maps-legend'
  const infoboxId = '#multi-maps-infobox'
  const selectorId = '#multi-maps-selector'
  const width = 846
  const height = 480
  const yExtent = [0, 35]
  const valueColSuffix = 'risiko_rel'

  d3.json(geoDataUrl, d => {
    const geoData = topojson.feature(d, d.objects.rvr_districts)

    d3.csv(dataUrl, data => {

      d3.playbooks.choroplethMap.defaults({
        color,
        nullColor: '#ededed',
        cssNamespace,
        height,
        width,
        data,
        geoData,
        yExtent,
        getId: f => f.properties.RS,
        responsiveSvg: true,
      })

      const maps = {}
      // broadcast hilighting
      const hilight = (master, slug, data) => {
        // hilight all others:
        Object.keys(maps).filter(s => s !== slug).map(k => {
          maps[k].hilight(data)
        })
        if (!master) {
          // trigger infobox update for master map
          const control = maps[Object.keys(maps)[0]].control()
          control.trigger(riot.EVT.updateInfobox, data)
          control.trigger(riot.EVT.updateSelector, data)
        }
      }

      const wrapper = d3.select(`#${wrapperId}`)
      let i = 0
      Object.keys(subjects).map(s => {
        const elementId = `${wrapperId}--${s}`
        const element = wrapper.append('div')
          .attr('id', elementId)
          .attr('class', 'multi-map__container')
        element.append('h4').attr('class', 'multi-map__title').text(subjects[s])
        maps[s] = d3.playbooks.choroplethMap({
          elementId,
          yCol: `${s}__${valueColSuffix}`
        }).render()

        // render master legends/infobox/selector for first iteration
        if (!i) {
          maps[s]
            .infobox({
              element: '#multi-maps-infobox',
              template: `
              <h4 class="cor-viz-ls__infobox-title">Anteil der Risikoschüler</h4>
              <p>in {GEN}</p>
              <dl class="fixme">
                <dt>{math__risiko_rel} %</dd>
                <dd>Mathe</dt>
                <dt>{german__risiko_rel} %</dd>
                <dd>Deutsch</dt>
                <dt>{english_listen__risiko_rel} %</dd>
                <dd>Englisch (Hören)</dt>
                <dt>{english_read__risiko_rel} %</dd>
                <dd>Englisch (Lesen)</dt>
              </dl>
              <p class="data--small">Teilnehmer: {participating}</p>
            `
            })
            .legend({
              wrapperTemplate: `
                <h4 class="multi-map__legend-title">Anteil in %</h4>
                <div class="multi-map__legend-items">
                  {body}
                </div>`,
              itemTemplate: '<span class="multi-map__legend-item" style="background-color:{color};">{label}</span>',
              element: '#multi-maps-legend'
            })
            .selector({
              element: '#multi-maps-selector',
              getLabel: f => f.GEN
            })

          // broadcast hilighting

          maps[s].control().on(riot.EVT.updateInfobox, d => hilight(true, s, d))
        } else {
          maps[s].control().on(riot.EVT.mouseover, ({data}) => hilight(false, s, data))
        }

        i++
      })

    })

  })

}


// small multiple bars
window.renderMultiBars = () => {

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

    const columns = Object.keys(subjects).map(s => subjects[s])
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

    // render charts
    data.map(d => {

      d3.playbooks.horizontalBarChart({
        elementId: d.chart_id,
        data: getChartData(d),
        color: d => d.y.indexOf('0') < 0 && d.y.indexOf('1') < 0 ? color[0] : color[3],
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
