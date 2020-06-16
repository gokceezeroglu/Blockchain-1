const express = require('express');
const app = express();
const { v1: uuidv1 } = require('uuid');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const nodeAddress = uuidv1().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get our chain
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

//create new transactions-->>added in Pending transactions
app.post('/transaction', function (req, res) {
  const blockIndex = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipent
  );
  res.json({ note: `Transaction will be added in block ${blockIndex}` });
});

//Mining new block
app.get('/mine', function (req, res) {
  //previous hash
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];

  //data
  const currentBlockData = {
    transactions: bitcoin.PendingTransactions,
    index: lastBlock['index'] + 1,
  };

  //proof of work
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

  //hash of current block
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  //as mining a new block will reward you 12.5 bitcoin so inthis we add 12.5 to amount on creating/minig block
  bitcoin.createNewTransaction(12.5, '00', nodeAddress); //send coin to recipent adress created by uuid  & 00 means reward

  //now create new block using previous values
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  res.json({
    note: 'New Block mined successfully',
    block: newBlock,
  });
});

app.listen(3000, function () {
  console.log('Server on Port 3000');
});
