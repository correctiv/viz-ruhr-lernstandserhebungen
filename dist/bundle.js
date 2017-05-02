!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(5)},function(t,e){"use strict";t.exports={COLORS:["#f9c280","#dfad71","#c59962","#ab8454","#917045","#775b36","#5e4728"],SUBJECTS:{math:"Mathe",german:"Deutsch",english_listen:"Englisch (Hören)",english_read:"Englisch (Lesen)"}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){t.selectAll("div").data(e).enter().append("div").attr("class","divbars__bar-outer").append("div").attr("class","divbars__bar").classed("divbars__bar--hilight",function(t){return!(t.x>1)}).style("width",function(t){return 1.3*t.y+"%"}).append("span").attr("class","divbars__bar-label").text(function(t){return Math.round(t.y)+" %"})}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.drawedSelection,n=t.control,r=e.filter(function(t){return!t.__data_missing__});r.on("mouseover",function(t){n.trigger(riot.EVT.mouseover,{node:this,data:t})}),r.on("mouseout",function(t){n.trigger(riot.EVT.mouseout,{node:this,data:t})})}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){var n=t.data,r=(t.xCol,e.getLabel),a={},i=function(t,e){return t<e?-1:t>e?1:0},s=function(t,e){return i(r(t),r(e))};return n.filter(function(t){return!t.__data_missing__}).sort(s).map(function(t){return a[r(t)]=t}),a}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var a=n(9),i=r(a),s=n(6),l=r(s);n(10),(0,i.default)(),(0,l.default)()},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=n(2),s=r(i);e.default=function(){var t="./data/schulformen.csv",e="multi-bars",n=d3.select("#"+e);d3.csv(t,function(t){var r=["Gymnasium","Hauptschule","Realschule","Schulen des längeren gemeinsamen Lernens"],i=["kein&nbsp;Niveau","Niveaustufe&nbsp;1","Niveaustuf&nbsp;2","Niveaustufe&nbsp;3","Niveaustufe&nbsp;4","Niveaustufe&nbsp;5"].reverse(),l=Object.keys(a.SUBJECTS).map(function(t){return a.SUBJECTS[t]});l.splice(0,0,null);var u=function(e){var n=t.filter(function(t){return t.schulform==e});return l.map(function(t){return n.find(function(e){return e.fach==t})})},o=function(t){return Object.keys(t).filter(function(t){return t.indexOf("niveau")>-1&&t.indexOf("6")<0}).sort().map(function(e,n){return{x:n||"-",y:t[e]}}).reverse()},c=n.append("div").selectAll("div").data(r).enter().append("div").attr("class",e+"__row "+e+"__row--section").html(function(t){return"<h3>"+t+"</h3>"});c.append("span").attr("class","annotation--smaller --mobile-only").text('Verteilung auf die Niveaustufen. "-" = keine Niveaustufe erreicht.'),c.call(function(t){l.map(function(n){n?t.selectAll("div").data(function(t){return u(t)}).enter().append("div").attr("class",e+"__cell "+e+"__cell--chart").append("div").attr("id",function(t){return t&&t.chart_id}).append("span").attr("class","chart-title").text(function(t){return t.fach}):t.append("div").attr("class",e+"__cell "+e+"__cell--labels").selectAll("span").data(i).enter().append("span").attr("class",e+"__label").html(function(t){return t})})}),t.map(function(t){d3.select("#"+t.chart_id).call(function(e){(0,s.default)(e,o(t))}).selectAll("div.divbars__bar").append("span").attr("class","multi-bars__mobile-labels --mobile-only").text(function(t){return t.x})})})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(8),i=r(a),s=riot.observable();s.on(riot.EVT.mouseover,function(t){var e=t.sender,n=t.data,r=riot.STORE.maps;Object.keys(r).filter(function(t){return t!==e}).map(function(t){var e=r[t];e.hilight(n.RS)}),e!==riot.STORE.master&&(r[riot.STORE.master].control().trigger(riot.EVT.updateInfobox,n),r[riot.STORE.master].control().trigger(riot.EVT.updateSelector,n))}),e.default=function(t){Object.keys(t).map(function(e){var n=t[e].control();n.on(riot.EVT.mouseover,function(t){var n=t.data;riot.STORE.activeMap=e,s.trigger(riot.EVT.mouseover,{sender:e,data:n})}),e===riot.STORE.master&&(n.on(riot.EVT.selectorSelect,function(t){s.trigger(riot.EVT.mouseover,{sender:e,data:t})}),n.on(riot.EVT.updateInfobox,function(t){setTimeout(function(){return(0,i.default)(t)},10)}))})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=n(2),s=r(i),l=d3.select("#multi-maps-small-bars").append("div").attr("class","multi-map__bars-wrapper").append("div").attr("class","multi-map__bar-chart").classed("--hidden",!0).attr("id","multi-map__bar-chart");l.append("h4").attr("class","multi-map__bar-chart-title").text("Ergebnisse"),l.append("span").attr("class","multi-map__bar-chart-subtitle");var u=function(t,e){return t.indexOf("_rel")>-1&&t.indexOf(e)>-1&&t.indexOf("risiko")<0},o=function(t){return Object.keys(t).filter(function(t){return u(t,riot.STORE.activeMap)}).sort().map(function(e,n){return{x:n||"-",y:t[e]}}).reverse()};e.default=function(t){var e=o(t);l.select("span").text(a.SUBJECTS[riot.STORE.activeMap]),riot.STORE.smallBars?(l.selectAll("div.divbars__bar").data(e).style("width",function(t){return 1.3*t.y+"%"}),l.selectAll("span.divbars__bar-label").data(e).text(function(t){return Math.round(t.y)+" %"})):(riot.STORE.smallBars=!0,l.classed("--hidden",!1),l.call(function(t){return(0,s.default)(t,e)}).selectAll("div.divbars__bar").append("span").attr("class","multi-map__bar-label").text(function(t){return t.x}),l.append("p").attr("class","annotation--small").html('Verteilung auf die Niveaustufen.<br>"-" = keine Niveaustufe erreicht.'))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=n(3),s=r(i),l=n(4),u=r(l),o=n(7),c=r(o);e.default=function(){var t="./data/data.csv",e="./data/nrw_districts.topo.json",n="multi-maps",r="multi-map",i=800,l=700,o=[0,35],d="risiko_rel";d3.json(e,function(e){var p=topojson.feature(e,e.objects.nrw_districts);d3.csv(t,function(t){d3.playbooks.choroplethMap.defaults({color:a.COLORS,nullColor:"#ededed",cssNamespace:r,height:l,width:i,data:t,geoData:p,yExtent:o,getId:function(t){return t.properties.RS},responsiveSvg:!0,mouseout:!1,addMouseEvents:s.default,getSelectorData:u.default});var e={};riot.STORE={activeMap:"math",smallBars:!1};var f=d3.select("#"+n);Object.keys(a.SUBJECTS).map(function(t,r){var i=n+"--"+t,s=f.append("div").attr("id",i).attr("class","multi-map__container");s.append("h4").attr("class","multi-map__title").text(a.SUBJECTS[t]),e[t]=d3.playbooks.choroplethMap({elementId:i,yCol:t+"__"+d}).render(),r||(riot.STORE.master=t,e[t].infobox({element:"#multi-maps-infobox",template:'\n              <h4 class="cor-viz-ls__infobox-title">Anteil der Schüler, die höchstens die 1.&nbsp;Niveaustufe erreichten</h4>\n              <table class="multi-map__table">\n                <tr class="multi-map__table-row multi-map__table-row--header">\n                  <td>{math__risiko_rel}&nbsp;%</td>\n                  <td>{german__risiko_rel}&nbsp;%</td>\n                  <td>{english_listen__risiko_rel}&nbsp;%</td>\n                  <td>{english_read__risiko_rel}&nbsp;%</td>\n                </tr>\n                <tr class="multi-map__table-row">\n                  <td>Mathe</td>\n                  <td>Deutsch</td>\n                  <td>Englisch (Hören)</td>\n                  <td>Englisch (Lesen)</td>\n                </tr>\n              </table>\n              <p class="annotation--small">Schüler insgesamt: <strong>{participating}</strong></p>\n            '}).legend({wrapperTemplate:'\n                <h4 class="multi-map__legend-title">Anteil in&nbsp;%</h4>\n                <div class="multi-map__legend-items">\n                  {body}\n                </div>',itemTemplate:'<span class="multi-map__legend-item" style="background-color:{color};">{label}</span>',element:"#multi-maps-legend"}).selector({element:"#multi-maps-selector",getLabel:function(t){return t.GEN}}))}),riot.STORE.maps=e,(0,c.default)(e)})})}},function(t,e){}]);
//# sourceMappingURL=bundle.js.map