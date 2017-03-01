//dataProviderService

module.exports = {
  getData: function () {
    return {
      products: 
      [
        { name: 'Cola', price: '1.00' },
        { name: 'Chips', price: '0.50' },
        { name: 'Candy', price: '0.65' }
      ],
      coins:
      [
        { name: 'Penny' },
        { name: 'Nickel' },
        { name: 'Dime' },
        { name: 'Quarter' }
      ]
    };
  }
};