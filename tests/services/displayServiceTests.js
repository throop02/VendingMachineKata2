//displayServiceTests

var chai = require('chai');
var expect = chai.expect;

var ds = require('./../../src/services/displayService');
var mocks = require('./../mocks');

describe('displayService', function() {

  it('Can write message to display', function() {   
    
    var testMessage = 'my message';
    var display = new ds.init(new mocks.mockConsole());
    display.write(testMessage);

    expect(display.stack[0]).to.equal(testMessage);
    
  });

  it('Logs displayed message to console', function() {   
    
    var testMessage = 'my message';
    var mockConsole = new mocks.mockConsole();
    var display = new ds.init(mockConsole);
    display.write(testMessage);

    expect(mockConsole.currentText).to.equal(testMessage);
    
  });

});