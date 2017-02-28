//dataProviderService

module.exports = {
  getProducts: function () {
    return {
      products: 
      [
        { name: 'Cola', price: '1.00' },
        { name: 'Chips', price: '0.50' },
        { name: 'Candy', price: '0.65' }
      ]
    };
  }
};