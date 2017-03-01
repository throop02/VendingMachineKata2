//vendingMachine

module.exports = {
  vmSession: function (stdin, con) {
    
    var scope = this;

    scope.lastKeyPressed = '';
    scope.display;
    scope.totalInserted = 0.00;

    scope.listenForKeypress = function()
    {
        var keypress = require('keypress');
        keypress(stdin);

        stdin.on('keypress', function (ch, key) {
        scope.keyPressed(key.name);
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
      scope.display.write("Select Product: [a] Cola [b] Chips [c] Candy");

      scope.listenForKeypress();
    };

    scope.coinInserted = function()
    {
      scope.totalInserted += 0.25;
    };

    scope.keyPressed = function(key)
    {
      scope.lastKeyPressed = key;

      if (['p','n','d','q'].indexOf(key) > -1)
      {
        scope.coinInserted();
      }

    };

  }
};