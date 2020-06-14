const Blockchain = require('./blockchain');

const bitcoin = new Blockchain(); //object of blockchain to acces it

/*//creating new block
bitcoin.createNewBlock(23389, 'ON162HHGHG12334', 'WEON1224435GFD');

bitcoin.createNewTransaction(100, 'ALEXHGDSJHDJHSGJD', 'JENGVSGDFGDG');

bitcoin.createNewBlock(111122, 'BABABAB2HHGHG12334', 'SHJSBH1224435GFD');

//cretaing transaction (store in pending transactions)
bitcoin.createNewTransaction(50, 'ALEXHGDSJHDJHSGJD', 'JENGVSGDFGDG');
bitcoin.createNewTransaction(200, 'ALEXHGDSJHDJHSGJD', 'JENGVSGDFGDG');
bitcoin.createNewTransaction(300, 'ALEXHGDSJHDJHSGJD', 'JENGVSGDFGDG');

bitcoin.createNewBlock(3334444, 'BAWAWAWAWAWAWXHXH', 'XXXXXXMXMDDDFF');*/

//create hash
const previousBlockHash = 'OJDNCHDHDJJKDDKJ';
const currentBlockData = [
  //array of transction in this block
  {
    amount: 10,
    sender: 'ALEX8976JHV9797HJ',
    recipient: '87687HJDJHGDJDJH',
  },
  {
    amount: 210,
    sender: 'JAMIL8976JHV9797HJ',
    recipient: 'RIAX87687HJDJHGDJDJH',
  },
  {
    amount: 300,
    sender: 'SHKAIL8976JHV9797HJ',
    recipient: 'RAIS87687HJDJHGDJDJH',
  },
];
const nonce = 1919;

const p = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

console.log(p);
