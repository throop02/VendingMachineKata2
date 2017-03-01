//vendingMachine

module.exports = {
  vmSession: function (stdin, con) {
    
    var scope = this;

    scope.lastKeyPressed;
    scope.display;
    scope.totalInserted;
    scope.dataProvider;
    scope.Q = require('node-linq').LINQ;

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
      scope.dataProvider = require('./services/dataProviderService');
      
      scope.totalInserted = 0.00;
      scope.lastKeyPressed = '';
      scope.display = new ds.init(con);

      scope.display.write("INSERT COIN: [p] Penny [n] Nickel [d] Dime [q] Quarter ([x] Exit)");
      scope.display.write("Select Product: [a] Cola [b] Chips [c] Candy");

      scope.listenForKeypress();
    };

    scope.coinInserted = function(coinType)
    {
      var coin = new scope.Q(scope.dataProvider.getData().coins).Single(function(x) { return x.code == coinType; });
      if (coin.code != 'p')
      {
        scope.totalInserted = Math.round((scope.totalInserted + coin.amount) * 100) / 100;
        scope.display.write(scope.totalInserted.toFixed(2));
      }
    };

    scope.tryPurchaseProduct = function(productType)
    {
        var product = new scope.Q(scope.dataProvider.getData().products).Single(function(x) { return x.code == productType; });
        if (product.price <= scope.totalInserted)
        {
          scope.totalInserted = Math.round((scope.totalInserted - product.price) * 100) / 100;
        } else {
          scope.display.write("Price: " + product.price.toFixed(2));
        }
    }

    scope.keyPressed = function(key)
    {
      scope.lastKeyPressed = key;
      var coinCodes = new scope.Q(scope.dataProvider.getData().coins).Select(function(x) { return x.code; }).ToArray();
      var productCodes = new scope.Q(scope.dataProvider.getData().products).Select(function(x) { return x.code; }).ToArray();

      if (coinCodes.indexOf(key) > -1)
      {
        scope.coinInserted(key);
      }

      if (productCodes.indexOf(key) > -1)
      {
        scope.tryPurchaseProduct(key);
      }

    };

  }
};