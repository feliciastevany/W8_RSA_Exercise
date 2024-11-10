const crypto = require('crypto');

// Load Alice's private key and Bob's public key
const alicePrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCodI1p1HWcjV2N
WvTUqLLxtfJdmnXnQpA4iTDoZfFAE0ATTS6yYWkFfn6m7mjDHkccgmWSj8MRNd1L
IIEc/YHxWqZht6/EkBYAT3ZQUDIOm3uaVVYXEXMHWFcxfLIthkTzOw9GOd1iUrMj
HKrGs2WndozxO5Gm8qGII0hDmcZ/elO7n8kbq12n0WSVMK5kk8l5HepQA0+2S8FL
ufOMugN63r4/QKzDytSyh8iAUwcq8/OgBJfzHmkY1PYKlfNC3ywEOV4t6GeFiK/C
FQGEh7aZkCTcSw2U/zDXEGC33822CoU67vP54RY3Tqnw6ezvAIc/BOxORUNHoNBK
MRJdYXeZAgMBAAECggEAANJDqRUlUdMhy66v5FRiaKRhVy8+/Va2ibiyhY7kr/Iq
v8VX3FG2WkBhWUqZixUBVgG1QX4PCTe85DDsrDxjXIQbglJhKnlPitFts2B2uVns
+VCf8+AXXQfDXL0zHbQf7zCAfNr19JTQZTQOiZuQ5pyA0qwejqS0IKwCXiZYa0vx
Juffh5/TT6nhxAwAleNxSLOvRb0uuYRsuBSkGx1X2DrPKS7CKsOL1StgRuE88bD6
t9yDHo7/J9c+FwyxWL3PGZisMp6vwpqyGLxq2cjC80lmQe/EoZracWTiz/w7dfzz
zx8MW/mQN6LEpz6BlvheqOBtJSppMiZ0EoENKn9iMQKBgQDiumqDkLhBxUgT3+Oi
29qRcJTUDPMbAjPZXfBq+5Mv8C41WMtqFoyRdpFyYiyHVmyp5Oa6zBhdl+gY2L7x
TskIate+ib9BBtXMi7TxWYenKUXFnjQ0g8y4wyeckQqiGWtwrXkf9dP1MRhch7ou
pv+8yvNkPkAPIEWR9cAGdoFd0QKBgQC+NCk0uH9T+VkRvd2LziJDxJi629n9mRoW
MNylGnSroFSw1KFgkX/hHwU76KltfmZQKuR2tzzAfitgJgexl0u1lX2x94GKI2dA
d5/I+Kvzwql5C0M5Tn9OuHtYIh+eu9XjQaHoKNUg3V1+cBolLkx2RN2KIBCqClQn
w81XtF0HSQKBgE9fUXCTll24Ed6bT5aw/thRoFiH3AeFgt9Cyqq5PbLXk2WrmzKd
iEJYTtzLT6llcQ8dCkU0tAb36hHgtx/FJA2lUbfrgx/ho7FC62penGXBxiJDmyUT
SvUXpONjx2QuH/XHVRMCPVyl/lBOV7iDUB4osoJSZJynAJPzg3D/xZQxAoGATVd2
ffqbw/C7mCxFXykF49qYZDsrzCQqaGWcAwLb+EHszi7YJCVmA4uSnEbCRkTEo8qd
NezSpk9noeQ08rDb102fW/OR2DMHND6wWY9MlIVOVmsO/cl+mOsJNNBDXU9x7MPu
azHXYFLDRruc1guaiej80MKzJAGpMLY81HIB9gkCgYEAxRvGrTDq1Aaz99c74aCf
19NnpwlqH89a3lrHRNUh1ssldWh56/pVK7PpnTeRNBvK2YU/1uy3OXkb6kix9LxK
QrzaSDE9PswNoBfYR9KbqDIgAvXHbISkGdpATJY0B2TldprmtL8jldb2QvSVfO06
eb/UBMQoOB1nK2BfkfzZQKg=
-----END PRIVATE KEY-----`;

// Alice's private key (used to sign messages she sends).
const alicePrivateKey = crypto.createPrivateKey(alicePrivateKeyPem);

const bobPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsPqr7zYgkxcZ6WsAkOEg
vUgX5NO22IOzZYDfY1W8qk/wyhdkhHgrUWGg/7ayXuf/UY74xHmMhCJfJJOK2Xil
oUH0CZai8OHlWiGAdMIB6j8xt+qvdpRkT2cC7GS9uM02w3e0Cyrld9viaCAbjSui
ZF14JHznZ43G5doHVeAm+iplugCBlf4khnEwf2TQCmSet8OkpHWg1SDcqBzGEVId
JKeWooDM//iKmRWy6GzpqXlA4+TjQERg4HwRI59Tp73Qsw2iuydlO5e1N0kdLA9k
O7Is7p5sAZGZDfCB/i0VVKQ7lnH+iNrKSAG8+aEqZ0ZIowYHMto07Fgatkqxn/FM
kwIDAQAB
-----END PUBLIC KEY-----`;

// Bob's public key (shared with others, like Alice, so they can encrypt messages specifically for him).
const bobPublicKey = crypto.createPublicKey(bobPublicKeyPem);

// The message Alice wants to send
const message = "I want some apples";
const data = Buffer.from(message);

// Create a signer object
const signer = crypto.createSign('sha256');
signer.update(message);
signer.end();

// Sign the message with Alice's private key
const signature = signer.sign(alicePrivateKey, 'hex');

// Encrypt the message using Bob's public key
const encryptedMessage = crypto.publicEncrypt(bobPublicKey, Buffer.from(message)).toString('hex');

// Output the signature and the encrypted message
console.log(`Signature: ${signature}`);
console.log(`Message: ${encryptedMessage}`);
