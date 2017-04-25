import {COLORS, SUBJECTS} from './config.js'

export default () => {

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
      Object.keys(SUBJECTS).map(s => {
        const elementId = `${wrapperId}--${s}`
        const element = wrapper.append('div')
          .attr('id', elementId)
          .attr('class', 'multi-map__container')
        element.append('h4').attr('class', 'multi-map__title').text(SUBJECTS[s])
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
