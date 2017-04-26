import renderBars from './multi_maps-render_bars.js'

// use additional global control
const Control = riot.observable()

Control.on(riot.EVT.mouseover, ({sender, data}) => {
  const maps = riot.STORE.maps

  // hilight all other maps except 'sender'-map
  // which is already hilighted
  Object.keys(maps).filter(k => k !== sender).map(slug => {
    const map = maps[slug]
    map.hilight(data.RS)
  })

  if (sender !== riot.STORE.master) {
    // trigger infobox & selector update on master map
    maps[riot.STORE.master].control().trigger(riot.EVT.updateInfobox, data)
    maps[riot.STORE.master].control().trigger(riot.EVT.updateSelector, data)
  }
})

export default maps => {

  Object.keys(maps).map(s => {
    // use control instance created by `d3-playbooks.riot-components`
    const control = maps[s].control()

    // remove mouseout events initialized by `d3-playbooks.riot-components`:
    // FIXME
    // control.off(riot.EVT.mouseout)

    // trigger global events
    control.on(riot.EVT.mouseover, ({data}) => {
      // maps[s].unhilight(maps[s])
      riot.STORE.activeMap = s
      Control.trigger(riot.EVT.mouseover, {sender: s, data})
    })

    if (s === riot.STORE.master) {
      // hilight other maps if master selector is used:
      control.on(riot.EVT.selectorSelect, data => {
        Control.trigger(riot.EVT.mouseover, {sender: s, data})
      })

      // draw small barchart inside infobox
      control.on(riot.EVT.updateInfobox, data => {
        // FIXME
        // wait until the app knows which map is active
        // (this delay is only nessecary if hovering the 'master' map for the first time
        // after using another map
        setTimeout(() => renderBars(data), 10)
      })
    }
  })

}
