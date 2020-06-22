const sha256 = require('sha256');
const { v1: uuidv1 } = require('uuid');
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
    transactionId: uuidv1().split('-').join(''),
  };

  return newTransaction;
};
Blockchain.prototype.addTransactionToPendingTransactions = function (
  transactionObj
) {
  this.PendingTransactions.push(transactionObj);
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

//validate chain to check whether the chain is legitimate/valid or not
//by iterate all of the blocks and make sure all of the blocks are lineup correctly
Blockchain.prototype.chainIsValid = function (blockchain) {
  let validChain = true;

  for (var i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i - 1];
    const blockHash = this.hashBlock(
      prevBlock['hash'],
      {
        transactions: currentBlock['transactions'],
        index: currentBlock['index'],
      },
      currentBlock['nonce']
    );
    //to validate block data by checking it ends with 4'0 or not
    if (blockHash.substring(0, 4) !== '0000') validChain = false;
    //to validate block by hash
    if (currentBlock['previousBlockHash'] !== prevBlock['hash'])
      validChain = false;
  }
  //check root/head/gensis block
  const gensisBlock = blockchain[0];
  const correctNonce = gensisBlock['nonce'] === 100;
  const correctPreviousBlockHash = gensisBlock['previousBlockHash'] === '0';
  const correctHash = gensisBlock['hash'] === '0';
  const correctTransactions = gensisBlock['transactions'].length === 0;
  if (
    !correctNonce ||
    !correctPreviousBlockHash ||
    !correctHash ||
    !correctTransactions
  )
    validChain = false;

  return validChain;
};

module.exports = Blockchain;
