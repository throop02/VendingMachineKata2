//displayServiceTests

var chai = require('chai');
var expect = chai.expect;

var ds = require('./../../src/services/displayService');

describe('displayService', function() {

  it('Can write message to display', function() {   
    
    var display = new ds.init();
    display.write('my message');

    expect(display.stack[0]).to.equal('my message');
    
  });

});