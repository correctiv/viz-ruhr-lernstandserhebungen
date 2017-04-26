import {SCHEMES, SUBJECTS} from './config.js'
import addEvents from './multi_maps-add_events.js'

export default () => {

  // options
  const dataUrl = './data/data.csv'
  // const geoDataUrl = './data/rvr_districts.topo.json'
  // const geoDataUrl = './data/nrw_districts.topo.json'
  const geoDataUrl = './data/nrw_districts_excerpt_fixed.topo.json'
  const wrapperId = 'multi-maps'
  const cssNamespace = 'multi-map'
  const legendId = '#multi-maps-legend'
  const infoboxId = '#multi-maps-infobox'
  const selectorId = '#multi-maps-selector'
  const width = 800
  const height = 600
  // rvr shape:
  // const width = 846
  // const height = 480
  const yExtent = [0, 35]
  const valueColSuffix = 'risiko_rel'

  d3.json(geoDataUrl, d => {
    // const geoData = topojson.feature(d, d.objects.rvr_districts)
    const geoData = topojson.feature(d, d.objects.nrw_districts_fixed)

    d3.csv(dataUrl, data => {

      d3.playbooks.choroplethMap.defaults({
        nullColor: '#ededed',
        cssNamespace,
        height,
        width,
        data,
        geoData,
        // yExtent,
        getId: f => f.properties.RS,
        responsiveSvg: true,
        // projection: d3.geoEquirectangular()
      })

      const maps = {}

      // have some state data globally
      riot.STORE = {
        activeMap: 'math'
      }

      const wrapper = d3.select(`#${wrapperId}`)

      Object.keys(SUBJECTS).map((s, i) => {
        const elementId = `${wrapperId}--${s}`
        const element = wrapper.append('div')
          .attr('id', elementId)
          .attr('class', 'multi-map__container')

        element.append('h4').attr('class', 'multi-map__title').text(SUBJECTS[s])

        // add legend element
        element.append('div')
          .attr('class', 'multi-map__legend')
          .attr('id', `multi-map__legend--${s}`)

        maps[s] = d3.playbooks.choroplethMap({
          color: SCHEMES[s],
          elementId,
          yCol: `${s}__${valueColSuffix}`
        }).render()
          .legend({
            wrapperTemplate: `
              <h4 class="multi-map__legend-title">Anteil in %</h4>
              <div class="multi-map__legend-items">
                {body}
              </div>`,
            itemTemplate: '<span class="multi-map__legend-item" style="background-color:{color};">{label}</span>',
            element: `#multi-map__legend--${s}`
          })

        // render infobox/selector for first iteration
        if (!i) {
          riot.STORE.master = s
          maps[s]
            .infobox({
              element: '#multi-maps-infobox',
              template: `
              <h4 class="cor-viz-ls__infobox-title">Anteil der Risikoschüler</h4>
              <table class="multi-map__table">
                <tr class="multi-map__table-row multi-map__table-row--header">
                  <td>{math__risiko_rel}&nbsp;%</td>
                  <td>{german__risiko_rel}&nbsp;%</td>
                  <td>{english_listen__risiko_rel}&nbsp;%</td>
                  <td>{english_read__risiko_rel}&nbsp;%</td>
                </tr>
                <tr class="multi-map__table-row">
                  <td>Mathe</td>
                  <td>Deutsch</td>
                  <td>Englisch (Hören)</td>
                  <td>Englisch (Lesen)</td>
                </tr>
              </table>
              <p class="data--small">Achtklässler, die in <strong>{GEN}</strong> an der Lernstandserhebung teilgenommen haben: <strong>{participating}</strong></p>
            `
            })
            .selector({
              element: '#multi-maps-selector',
              getLabel: f => f.GEN
            })
        }

      })

      riot.STORE.maps = maps
      addEvents(maps)

    })

  })

}
