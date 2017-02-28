//dataProviderServiceTests

var chai = require('chai');
var expect = chai.expect;
var _Q = require('node-linq').LINQ;

var provider = require('./../../src/services/dataProviderService');

describe('dataProviderService', function() {
  it('getProducts() should return correct quantity and types of products', function() {
    
    var p = provider.getProducts().products;
    
    expect(new _Q(p).Count()).to.equal(3);
    expect(new _Q(p).Where(function(x) { return x.name == "Cola" && x.price == "1.00"; }).Count()).to.equal(1);
    expect(new _Q(p).Where(function(x) { return x.name == "Chips" && x.price == "0.50"; }).Count()).to.equal(1);
    expect(new _Q(p).Where(function(x) { return x.name == "Candy" && x.price == "0.65"; }).Count()).to.equal(1);
  });
});