//vendingMachineTests

var chai = require('chai');
var expect = chai.expect;
var _Q = require('node-linq').LINQ;

var vm = require('./../src/vendingMachine');

describe('vendingMachine', function() {

  it('Listens for keypad input', function() {   
    
    var keyToTest = 'c';
    mockStdin = require('mock-stdin').stdin();
    vmSession = new vm.vmSession(mockStdin);
    vmSession.listenForKeypress();
    mockStdin.send(keyToTest);

    expect(vmSession.lastKeyPressed).to.equal(keyToTest);
    
  });

});