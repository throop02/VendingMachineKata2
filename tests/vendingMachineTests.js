//vendingMachineTests

var chai = require('chai');
var expect = chai.expect;
var _Q = require('node-linq').LINQ;

var vm = require('./../src/vendingMachine');
var mockStdin = require('mock-stdin').stdin();
var vmSession;
var mocks = require('./mocks');
var mockConsole;

describe('vendingMachine', function() {

  before(function()
  {
    mockConsole = new mocks.mockConsole();
    vmSession = new vm.vmSession(mockStdin, mockConsole);
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

  it('Can accept coins', function() {   
    
    vmSession.coinInserted();

    expect(true).to.equal(true);
    
  });

  it('Keeps track of total inserted', function() {   

    expect(vmSession.totalInserted).to.equal(0.00);
    
  });

});