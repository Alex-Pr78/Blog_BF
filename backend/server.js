require('crypto').webcrypto.then((crypto) => {
  globalThis.crypto = crypto;
  require('./app.js');
});
