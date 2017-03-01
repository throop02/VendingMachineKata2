//vendingMachine

module.exports = {
  vmSession: function (stdin) {
    
    var scope = this;

    scope.lastKeyPressed = '';

    scope.listenForKeypress = function()
    {
        var keypress = require('keypress');
        keypress(stdin);

        stdin.on('keypress', function (ch, key) {
        scope.lastKeyPressed = key.name;
        if (key && key.name == 'q') {
            stdin.pause();
        }
        });
    
        stdin.setRawMode(true);
        stdin.resume(); 
    };

  }
};