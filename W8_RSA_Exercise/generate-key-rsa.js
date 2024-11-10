const crypto = require('crypto');

const options = {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
};

const { privateKey: senderPrivateKey, publicKey: senderPublicKey } = crypto.generateKeyPairSync("rsa", options);
console.log("Private Key:", senderPrivateKey);
console.log("Public Key:", senderPublicKey);
console.log('Alice\'s RSA key pair generated.');

// Don't forget to generate the key twice (Alice & Bob)