import {COLORS, SUBJECTS} from './config.js'
import addMouseEvents from './add_mouse_events.js'
import getSelectorData from './get_selector_data.js'
import addEvents from './multi_maps-add_events.js'

export default () => {

  // options
  const dataUrl = './data/data.csv'
  const geoDataUrl = './data/nrw_districts.topo.json'
  const wrapperId = 'multi-maps'
  const cssNamespace = 'multi-map'
  const legendId = '#multi-maps-legend'
  const infoboxId = '#multi-maps-infobox'
  const selectorId = '#multi-maps-selector'
  const width = 800
  const height = 700
  const yExtent = [0, 35]
  const valueColSuffix = 'risiko_rel'

  d3.json(geoDataUrl, d => {
    const geoData = topojson.feature(d, d.objects.nrw_districts)

    d3.csv(dataUrl, data => {

      d3.playbooks.choroplethMap.defaults({
        color: COLORS,
        nullColor: '#ededed',
        cssNamespace,
        height,
        width,
        data,
        geoData,
        yExtent,
        getId: f => f.properties.RS,
        responsiveSvg: true,
        mouseout: false,
        addMouseEvents,
        getSelectorData
        // projection: d3.geoEquirectangular()
      })

      const maps = {}

      // have some state data globally
      riot.STORE = {
        activeMap: 'math',
        smallBars: false
      }

      const wrapper = d3.select(`#${wrapperId}`)

      Object.keys(SUBJECTS).map((s, i) => {
        const elementId = `${wrapperId}--${s}`
        const element = wrapper.append('div')
          .attr('id', elementId)
          .attr('class', 'multi-map__container')
        element.append('h4').attr('class', 'multi-map__title').text(SUBJECTS[s])
        maps[s] = d3.playbooks.choroplethMap({
          elementId,
          yCol: `${s}__${valueColSuffix}`
        }).render()

        // render legends/infobox/selector for first iteration
        if (!i) {
          riot.STORE.master = s
          maps[s]
            .infobox({
              element: '#multi-maps-infobox',
              template: `
              <h4 class="cor-viz-ls__infobox-title">Anteil der Schüler, die höchstens die 1.&nbsp;Niveaustufe erreichten</h4>
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
              <p class="annotation--small">Teilnehmende Schüler: <strong>{participating}</strong></p>
            `
            })
            .legend({
              wrapperTemplate: `
                <h4 class="multi-map__legend-title">Anteil in&nbsp;%</h4>
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
        }

      })

      riot.STORE.maps = maps
      addEvents(maps)

    })

  })

}
