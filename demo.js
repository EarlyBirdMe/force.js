require(['forces/dom', 'forces/string', 'front.js/front.min'], function(dom, string, front) {
  var data = [{letter: 'R', bg: '#f00'}, {letter: 'A', bg: '#f80'}, {letter: 'I', bg: '#ff0'}, {letter: 'N', bg: '#62d815'}, {letter: 'B', bg: '#00eaf8'}, {letter: 'O', bg: '#000490'}, {letter: 'W', bg: '#f100c3'}];
  var node = dom.byId('node');
  var tmpl = '<div class="cell" style="background:{{bg}}">{{letter}}</div>';
  front.parse(data, node, tmpl);
  dom.addClass(node, 'rainbow');

  var cells = dom.byClass('cell', node);
  var titleString = 'force.js / ';
  for(var i = 0; i < cells.length; i++) {
    titleString = string.concat(titleString, string.lower(cells[i].innerHTML));
  }
  dom.byId('title').innerHTML = titleString;
});