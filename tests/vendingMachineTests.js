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
    
    var coinKeys = ['p','n','d','q'];
    for(var i = 0; i < coinKeys.length; i++)
    {
      vmSession.keyPressed(coinKeys[i]);
    }

    expect(vmSession.totalInserted).to.equal(0.41);
    
  });

  it('Keeps track of total inserted', function() {   
    
    vmSession = new vm.vmSession(mockStdin, mockConsole);
    expect(vmSession.totalInserted).to.equal(0);
    
  });

  it('Displays total when coin is inserted', function() {   
    
    vmSession = new vm.vmSession(mockStdin, mockConsole);
    vmSession.initMachine();
    vmSession.coinInserted('q');
    expect(vmSession.display.stack.indexOf("0.25") > -1).to.equal(true);
    
  });

});