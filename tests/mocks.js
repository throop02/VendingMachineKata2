//mocks

module.exports = {
  mockConsole: function () {
    
    this.currentText = '';
    this.log = function(message)
    {
        this.currentText = message;
    };

  }
};