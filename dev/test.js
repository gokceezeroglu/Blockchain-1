const Blockchain = require('./blockchain');

const bitcoin = new Blockchain(); //object of blockchain to acces it

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1592780036577,
      transactions: [],
      nonce: 100,
      hash: '0',
      previousBlockHash: '0',
    },
    {
      index: 2,
      timestamp: 1592780180389,
      transactions: [],
      nonce: 18140,
      hash: '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
      previousBlockHash: '0',
    },
    {
      index: 3,
      timestamp: 1592780280631,
      transactions: [
        {
          amount: 12.5,
          sender: '00',
          recipient: '165c4c20b41211ea9c6719feba20e6e2',
          transactionId: '6c49d350b41211ea9c6719feba20e6e2',
        },
        {
          amount: 10,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: '9abb5240b41211ea9c6719feba20e6e2',
        },
        {
          amount: 20,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: '9e229920b41211ea9c6719feba20e6e2',
        },
        {
          amount: 30,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: 'a1dc45c0b41211ea9c6719feba20e6e2',
        },
      ],
      nonce: 56678,
      hash: '0000c6c5ff04ac58262c56f563a07ff4764dd78ab90bea068b18711def4e8e4c',
      previousBlockHash:
        '0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100',
    },
    {
      index: 4,
      timestamp: 1592780339277,
      transactions: [
        {
          amount: 12.5,
          sender: '00',
          recipient: '165c4c20b41211ea9c6719feba20e6e2',
          transactionId: 'a7d470b0b41211ea9c6719feba20e6e2',
        },
        {
          amount: 40,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: 'bb6dd5d0b41211ea9c6719feba20e6e2',
        },
        {
          amount: 50,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: 'bec76110b41211ea9c6719feba20e6e2',
        },
        {
          amount: 60,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: 'c3b6f5a0b41211ea9c6719feba20e6e2',
        },
        {
          amount: 70,
          sender: 'RAJA687866GFHJ',
          recipient: 'RAVISH6756756565',
          transactionId: 'c65b3aa0b41211ea9c6719feba20e6e2',
        },
      ],
      nonce: 26493,
      hash: '0000ce92661c671e5910518612629fe8b4bbedb8c8392f7e1111a0f57f182f15',
      previousBlockHash:
        '0000c6c5ff04ac58262c56f563a07ff4764dd78ab90bea068b18711def4e8e4c',
    },
    {
      index: 5,
      timestamp: 1592780360274,
      transactions: [
        {
          amount: 12.5,
          sender: '00',
          recipient: '165c4c20b41211ea9c6719feba20e6e2',
          transactionId: 'cac8cdf0b41211ea9c6719feba20e6e2',
        },
      ],
      nonce: 47547,
      hash: '0000a02d222fd3dbe9aaf46ee44705579423904227f1730da4c862f1648036d2',
      previousBlockHash:
        '0000ce92661c671e5910518612629fe8b4bbedb8c8392f7e1111a0f57f182f15',
    },
    {
      index: 6,
      timestamp: 1592780363851,
      transactions: [
        {
          amount: 12.5,
          sender: '00',
          recipient: '165c4c20b41211ea9c6719feba20e6e2',
          transactionId: 'd74cb140b41211ea9c6719feba20e6e2',
        },
      ],
      nonce: 4260,
      hash: '0000fe6000e0269d6e5515c1625025097f16c2efdc223bc4efbc250f8fb5e33e',
      previousBlockHash:
        '0000a02d222fd3dbe9aaf46ee44705579423904227f1730da4c862f1648036d2',
    },
  ],
  PendingTransactions: [
    {
      amount: 12.5,
      sender: '00',
      recipient: '165c4c20b41211ea9c6719feba20e6e2',
      transactionId: 'd96ea6e0b41211ea9c6719feba20e6e2',
    },
  ],
  currentNodeUrl: 'http://localhost:3001',
  networkNodes: [],
};

console.log('VALID:', bitcoin.chainIsValid(bc1.chain));

//console.log(bitcoin);

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
/*const previousBlockHash = 'OJDNCHDHDJJKDDKJ';
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
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 73288));*/
//creating proof of work
/*console.log(
  bitcoin.proofOfWork(previousBlockHash, currentBlockData, currentBlockData)
);*/
