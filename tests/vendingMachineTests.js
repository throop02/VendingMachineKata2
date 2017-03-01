//vendingMachineTests

var chai = require('chai');
var expect = chai.expect;
var _Q = require('node-linq').LINQ;

var vm = require('./../src/vendingMachine');
var mockStdin = require('mock-stdin').stdin();
var vmSession;
var mocks = require('./mocks');
var mockConsole;
var dataProvider;


describe('vendingMachine', function() {

  before(function()
  {
    mockConsole = new mocks.mockConsole();
    vmSession = new vm.vmSession(mockStdin, mockConsole);
    dataProvider = require('./../src/services/dataProviderService');
  });

  it('Listens for keypad input when initialized', function() {   
    
    var keyToTest = 'c';
    vmSession.initMachine();
    mockStdin.send(keyToTest);

    expect(vmSession.lastKeyPressed).to.equal(keyToTest);
    
  });

  it('Displays welcome message when initialized', function() {   
    
    vmSession.initMachine();

    expect(vmSession.display.stack.indexOf("INSERT COIN: [p] Penny [n] Nickel [d] Dime [q] Quarter ([x] Exit)") > -1).to.equal(true);
    expect(vmSession.display.stack.indexOf("Select Product: [a] Cola [b] Chips [c] Candy") > -1).to.equal(true);
    
  });

  it('Accepts silver coins when coin key pressed', function() {   
    
    vmSession.initMachine();
    var coinKeys = new _Q(dataProvider.getData().coins).Select(function(x) { return x.code; }).ToArray()
    for(var i = 0; i < coinKeys.length; i++)
    {
      vmSession.keyPressed(coinKeys[i]);
    }

    var validTotal = Math.round(new _Q(dataProvider.getData().coins).Where(function(x) { return x.code != 'p'; }).Sum(function(x) { return x.amount; }) * 100) / 100;
    expect(vmSession.totalInserted).to.equal(validTotal);
    
  });

  it('Keeps track of total inserted', function() {   
    
    vmSession.initMachine();
    expect(vmSession.totalInserted).to.equal(0);
    
  });

  it('Displays total when coin is inserted', function() {   
    
    vmSession.initMachine();
    var coin = new _Q(dataProvider.getData().coins).Single(function(x) { return x.name == 'Quarter'; });
    vmSession.coinInserted(coin.code);
    expect(vmSession.display.stack.indexOf(coin.amount.toFixed(2)) > -1).to.equal(true);
    
  });

  it('Can have items purchased', function() {   
    
    vmSession.initMachine();
    var products = new _Q(dataProvider.getData().products);
    var productCodes = products.Select(function(x) { return x.code; }).ToArray();
    vmSession.totalInserted = 100;
    for(var i = 0; i < productCodes.length; i++)
    {
      vmSession.keyPressed(productCodes[i]);
    }

    expect(vmSession.totalInserted).to.equal(97.85);
    
  });

  it('Resets state when initialized', function() {   
    
    vmSession.totalInserted = 1.00;
    vmSession.lastKeyPressed = 'd';
    vmSession.initMachine();

    expect(vmSession.totalInserted).to.equal(0.00);
    expect(vmSession.lastKeyPressed).to.equal('');
    
  });

  it('Rejects pennies when inserted', function() {   
    
    vmSession.initMachine();
    var penny = new _Q(dataProvider.getData().coins).Single(function(x) { return x.name == 'Penny'; });
    vmSession.coinInserted(penny.code);
    
    expect(vmSession.totalInserted).to.equal(0.00);
    
    
  });

  it('Displays price if funds are insufficient', function() {   
    
    vmSession.initMachine();
    var product = new _Q(dataProvider.getData().products).First();
    vmSession.keyPressed(product.code);

    expect(vmSession.display.stack.indexOf("Price: " + product.price.toFixed(2)) > -1).to.equal(true);
    
  });

});