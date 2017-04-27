export default (element, data) => {
  element.selectAll('div').data(data).enter()
    .append('div')
      .attr('class', 'divbars__bar-outer')
    .append('div')
      .attr('class', 'divbars__bar')
      .classed('divbars__bar--hilight', d => !(d.x > 1))
      .style('width', d => `${d.y * 1.3}%`)  // FIXME
    .append('span')
      .attr('class', 'divbars__bar-label')
      .text(d => `${Math.round(d.y)} %`)
}
