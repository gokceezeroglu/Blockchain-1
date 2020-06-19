const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];

function Blockchain() {
  this.chain = []; //to store all blocks
  this.PendingTransactions = []; //to store new transactions
  //gensis block or head block

  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];
  this.createNewBlock(100, '0', '0');
}

//new block
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

//get last block
Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};

//new transaction
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

//hash/encrypt block
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

//proof of work
//repedatedly hash block until it finds correct hash=>hash start with specific numbers
//use current block data for hash but also previousBlock hash so one if one want to chan ge one block than all  blocks need to be chanhged
//to find correct hash it continously change value of nonce
//return us the nonce value that creates the required hash
Blockchain.prototype.proofOfWork = function (
  previousBlockHash,
  currentBlockData
) {
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

  while (hash.substring(0, 4) !== '0000') {
    //run until hash starting with four 0's
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  //console.log(hash);
  return nonce;
};

module.exports = Blockchain;
