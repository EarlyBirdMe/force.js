require(['forces/dom', 'forces/string', 'front.js/front.min'], function(dom, string, front) {
  var data = [{letter:'R'},{letter:'A'},{letter:'I'},{letter:'N'},{letter:'B'},{letter:'O'},{letter:'W'}];
  var node = dom.byId('node');
  var tmpl = '<div class="letter">{{letter}}</div>';
  front.parse(data, node, tmpl);
  dom.addClass(node, 'rainbow');

  var cells = dom.byClass('letter', node);
  var titleString = 'force.js / ';
  for(var i = 0; i < cells.length; i++) {
    titleString = string.concat(titleString, string.lower(cells[i].innerHTML));
  }
  dom.byId('title').innerHTML = titleString;
});