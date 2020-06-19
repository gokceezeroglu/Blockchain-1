const express = require('express');
const app = express();
const { v1: uuidv1 } = require('uuid');
const bodyParser = require('body-parser'); //to parse data in json
const Blockchain = require('./blockchain');
const port = process.argv[2]; //to get port from package.json
const rp = require('request-promise'); //to brodcast node to all other

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

  //as mining a new block will reward you 12.5 bitcoin so in this we add 12.5 to amount on creating/minig block
  bitcoin.createNewTransaction(12.5, '00', nodeAddress); //send coin to recipent adress added in pending transactions, created by uuid  & 00 means reward

  //now create new block using previous values
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  res.json({
    note: 'New Block mined successfully',
    block: newBlock,
  });
});

//register a node and broadcast it to entire network
app.post('/register-and-broadcast-node', function (req, res) {
  //add a node in network array
  const newNodeUrl = req.body.newNodeUrl;
  //if already newnodeurl is not present
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
    bitcoin.networkNodes.push(newNodeUrl);

  //broadcast to other nodes
  const regNodePromises = [];
  bitcoin.networkNodes.forEach((networkNodeUrl) => {
    //'register-node'
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true,
    };
    regNodePromises.push(rp(requestOptions)); //asynchronously add node to promise
  });

  Promise.all(regNodePromises)
    .then((data) => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl],
        },
        json: true,
      };
      return rp(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: 'New Node registered with network successfully.' });
    });
});

//register node with network
app.post('/register-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode)
    bitcoin.networkNodes.push(newNodeUrl);
  res.json({ note: 'New node registered successfully ' });
});

//register  multiple nodes at once
app.post('/register-nodes-bulk', function (req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach((networkNodeUrl) => {
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
      bitcoin.networkNodes.push(networkNodeUrl);
  });
  res.json({ note: 'Bulk regestration successfull.' });
});

app.listen(port, function () {
  console.log(`Server on Port ${port}`);
});
