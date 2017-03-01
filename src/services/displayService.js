//displayService

module.exports = {
  init: function (con) {
    
    var scope = this;

    scope.stack = [];

    scope.write = function(message)
    {
        scope.stack.push(message);
        con.log(message);
    };

  }
};