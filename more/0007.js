/*
https://github.com/JoyOfJavaScript/joj/tree/master/src/chapter-listings/src/ch02
2021 The Joy of JavaScript
Chapter 2 Inheritance-based object modeling
*/

// Transaction hierarchy using constructor functions
class Transaction {
  sender = '';
  recipient = '';
  funds = 0.0;
  #feePercent = 0.6;
  constructor(sender, recipient, funds = 0.0) {
    this.sender = sender;
    this.recipient = recipient;
    this.funds = Number(funds);
  }
  displayTransaction() {
    return `Transaction from ${this.sender} to ${this.recipient}
         for ${this.funds}`;
  }
  get netTotal() {
    return Transaction.#precisionRound(this.funds * this.#feePercent, 2);
  }
  // Currently awaiting on Babel-eslint bug to address private class methods
  // https://github.com/babel/eslint-plugin-babel/issues/166
  // Using _ instead of # for now
  static #precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
}

class HashTransaction extends Transaction {
  transactionId;
  constructor(sender, recipient, funds = 0.0) {
    super(sender, recipient, funds);
    this.transactionId = this.calculateHash();
  }
  calculateHash() {
    const data = [this.sender, this.recipient, this.funds].join('');
    let hash = 0;

    let i = 0;
    while (i < data.length) {
      hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0;
    }
    return hash ** 2;
  }

  displayTransaction() {
    return `${this.transactionId}: ${super.displayTransaction()}`;
  }
}
const tx = new HashTransaction('luis@joj.com', 'luke@joj.com', 10);
console.log(tx.netTotal);

// Transaction using IIFE
// when IIFE, only functions in return statement
// can be used
const Transaction2 = (function() {
  const feePercent = 0.6;

  function precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  return {
    construct: function(sender, recipient, funds = 0.0) {
      this.sender = sender;
      this.recipient = recipient;
      this.funds = Number(funds);
      return this;
    },
    netTotal: function() {
      return precisionRound(this.funds * feePercent, 2);
    }
  };
})();

const coffee = Transaction2.construct('luke@joj.com', 'ana@joj.com', 2.5);
console.log(coffee.netTotal());


