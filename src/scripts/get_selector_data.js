export default ({
  data,
  xCol
}, {
  getLabel
}) => {
  const _data = {}
  const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0
  const _sort = (a, b) => compare(getLabel(a), getLabel(b))
  data.filter(d => !d.__data_missing__).sort(_sort).map(d => _data[getLabel(d)] = d)
  return _data
}
