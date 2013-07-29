require(['forces/dom', 'front.js/front.min'], function(dom, front) {
  var data = [{letter: 'R', bg: '#f00'}, {letter: 'A', bg: '#f80'}, {letter: 'I', bg: '#ff0'}, {letter: 'N', bg: '#62d815'}, {letter: 'B', bg: '#00eaf8'}, {letter: 'O', bg: '#000490'}, {letter: 'W', bg: '#f100c3'}];
  var node = dom.byId('node');
  var tmpl = '<div class="cell" style="background:{{bg}}">{{letter}}</div>';
  front.render(tmpl, data, node);
  dom.addClass(node, 'rainbow');
  dom.byId('title').innerHTML = 'force.js / ' + front.render('{{letter}}', data);
});