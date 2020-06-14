const sha256 = require('sha256');

function Blockchain() {
  this.chain = []; //to store all blocks
  this.PendingTransactions = []; //to store new transactions
}

Blockchain.prototype.createNewBlock = function (
  nonce,
  previousBlockHash,
  hash
) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.PendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  this.PendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (
  amount,
  sender,
  recipent
) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipent,
  };
  this.PendingTransactions.push(newTransaction);
  return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function (
  previousBlockHash,
  currentBlockData,
  nonce
) {
  //concatenate all data into single string
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  //hash the string
  const hash = sha256(dataAsString);
  return hash;
};

module.exports = Blockchain;
