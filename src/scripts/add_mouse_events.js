export default ({
  drawedSelection,
  control,
}) => {
  const availableSelection = drawedSelection.filter(d => !d.__data_missing__)

  availableSelection.on('mouseover', function(data) {
      control.trigger(riot.EVT.mouseover, {
        node: this,
        data
      })
    })
  availableSelection.on('mouseout', function(data) {
      control.trigger(riot.EVT.mouseout, {
        node: this,
        data
      })
    })
}
