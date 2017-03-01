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

  it('Accepts coins when coin key pressed', function() {   
    
    vmSession.initMachine();
    var coinKeys = new _Q(dataProvider.getData().coins).Select(function(x) { return x.code; }).ToArray()
    for(var i = 0; i < coinKeys.length; i++)
    {
      vmSession.keyPressed(coinKeys[i]);
    }

    expect(vmSession.totalInserted).to.equal(Math.round(new _Q(dataProvider.getData().coins).Sum(function(x) { return x.amount; }) * 100) / 100);
    
  });

  it('Keeps track of total inserted', function() {   
    
    vmSession.initMachine();
    expect(vmSession.totalInserted).to.equal(0);
    
  });

  it('Displays total when coin is inserted', function() {   
    
    vmSession.initMachine();
    var coin = new _Q(dataProvider.getData().coins).Single(function(x) { return x.name == 'Quarter'; });
    vmSession.coinInserted(coin.code);
    expect(vmSession.display.stack.indexOf(coin.amount.toString()) > -1).to.equal(true);
    
  });

  it('Can have items purchased', function() {   
    
    vmSession.initMachine();
    var productCodes = new _Q(dataProvider.getData().products).Select(function(x) { return x.code; }).ToArray()
    for(var i = 0; i < productCodes.length; i++)
    {
      vmSession.keyPressed(productCodes[i]);
    }

    expect(vmSession.totalInserted < 0).to.equal(true);
    
  });

    it('Resets state when initialized', function() {   
    
    vmSession.totalInserted = 1.00;
    vmSession.lastKeyPressed = 'd';
    vmSession.initMachine();

    expect(vmSession.totalInserted == 0.00 && vmSession.lastKeyPressed == '').to.equal(true);
    
  });

});