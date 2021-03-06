const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "25/04/2021", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
        }

        if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
        }

        if (currentBlock.hash !== previousBlock.hash) {
            return false;
        }

        return true;
    }
}

// let urizarCoin = new Blockchain();
// urizarCoin.addBlock(new Block(1, "25/04/2021", { amount: 1 }));
// urizarCoin.addBlock(new Block(2, "25/04/2021", { amount: 10 }));

// console.log(JSON.stringify(urizarCoin, null, 4));

