//vendingMachine

module.exports = {
  vmSession: function (stdin, con) {
    
    var scope = this;

    scope.lastKeyPressed = '';
    scope.display;

    scope.listenForKeypress = function()
    {
        var keypress = require('keypress');
        keypress(stdin);

        stdin.on('keypress', function (ch, key) {
        scope.lastKeyPressed = key.name;
        if (key && key.name == 'x') {
            stdin.pause();
        }
        });
    
        stdin.setRawMode(true);
        stdin.resume(); 
    };

    scope.initMachine = function()
    {
      var ds = require('./services/displayService');
      scope.display = new ds.init(con);

      scope.display.write("INSERT COIN: [p] Penny [n] Nickel [d] Dime [q] Quarter ([x] Exit)");

      scope.listenForKeypress();
    };

    scope.coinInserted = function()
    {

    };

  }
};