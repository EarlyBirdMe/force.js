define('forces/dom', ['forces/query'], function(query) {

  var force = {

    'byId': query['byId'],

    'byTag': query['byTag'],

    'byClass': query['byClass'],

    'hasClass': function(node, cls) {
      var filter = new RegExp("(^|\\s)" + cls + "(\\s|$)");
      return filter.test(node.className.toLowerCase());
    },

    'addClass': function(node, cls) {
      if(!this.hasClass(node, cls)) {
        node.className = (node.className + ' ' + cls).replace(/\s\s+/, ' ').replace(/^\s/, '').replace(/\s$/, '');
      }
      return node;
    },

    'removeClass': function(node, cls) {
      if(this.hasClass(node, cls)) {
        node.className = (' ' + node.className + ' ').replace(' ' + cls + ' ', ' ').replace(/\s\s+/, ' ').replace(/^\s/, '').replace(/\s$/, '');
      }
      return node;
    }

  };

  return force;

});