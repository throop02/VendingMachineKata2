//displayService

module.exports = {
  init: function () {
    
    var scope = this;

    scope.stack = [];

    scope.write = function(message)
    {
        scope.stack.push(message);
    };

  }
};