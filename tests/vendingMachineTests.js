//vendingMachineTests

var chai = require('chai');
var expect = chai.expect;
var _Q = require('node-linq').LINQ;

var vm = require('./../src/vendingMachine');
var mockStdin = require('mock-stdin').stdin();
var vmSession;

describe('vendingMachine', function() {

  before(function()
  {
    vmSession = new vm.vmSession(mockStdin);
  });

  it('Listens for keypad input', function() {   
    
    var keyToTest = 'c';
    vmSession.listenForKeypress();
    mockStdin.send(keyToTest);

    expect(vmSession.lastKeyPressed).to.equal(keyToTest);
    
  });

  it('Can be initialized', function() {   
    
    vmSession.initMachine();
    expect(true).to.equal(true);
    
  });

});