//dataProviderServiceTests

var chai = require('chai');
var expect = chai.expect;

describe('dataProviderService', function() {
  it('getProducts() should return some products', function() {
    var provider = require('./../../src/services/dataProviderService');
    expect(provider.getProducts()).to.equal("Cola,Chips,Candy");
  });
});