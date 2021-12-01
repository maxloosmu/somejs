/*
https://github.com/JoyOfJavaScript/joj/tree/master/src/chapter-listings/src/ch03
2021 The Joy of JavaScript
Chapter 3 Linked, compositional object models
*/

const Transaction = {
  init(sender, recipient, funds = 0.0) {
    this.sender = sender
    this.recipient = recipient
    this.funds = Number(funds)
    return this
  },
  displayTransaction() {
    return `Transaction from ${this.sender} to ${this.recipient} for ${this.funds}`
  }
}
const HashTransaction = Object.create(Transaction).init('aaa', 'bbb', 10)
HashTransaction.calculateHash = function() {
  const data = [this.sender, this.recipient, this.funds].join('')
  let hash = 0
  let i = 0
  while (i < data.length) {
    hash = ((hash << 5) - hash + data.charCodeAt(i++)) << 0
  }
  return hash ** 2
}
const tx = Object.create(HashTransaction)
console.log(tx.displayTransaction())
console.log(tx.__proto__)
console.log(tx.__proto__.__proto__)
console.log(tx.__proto__.__proto__.__proto__)
console.log(tx.__proto__.__proto__.__proto__.__proto__)

