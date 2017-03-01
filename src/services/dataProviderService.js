//dataProviderService

module.exports = {
  getData: function () {
    return {
      products: 
      [
        { name: 'Cola', price: '1.00', code: 'a' },
        { name: 'Chips', price: '0.50', code: 'b' },
        { name: 'Candy', price: '0.65', code: 'c' }
      ],
      coins:
      [
        { name: 'Penny', amount: 0.01, code: 'p' },
        { name: 'Nickel', amount: 0.05, code: 'n' },
        { name: 'Dime', amount: 0.10, code: 'd' },
        { name: 'Quarter', amount: 0.25, code: 'q' }
      ]
    };
  }
};