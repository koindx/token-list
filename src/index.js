const buildList = require('./build');
const fs = require("fs");
const path = require("path");

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tokens List</title>
</head>
<body>
  <h1 id="request-a-token-listing-on-koindx">Request a token listing on KoinDX</h1>
  <p>Please create an issue with the help of our template, to apply for a KoinDX token listing.</p>
  <p>Be aware, not every requested token will get listed on KoinDX.</p>
  <p>Make sure to provide the following information. </p>
  <pre>
    <code>
      <span class="hljs-keyword">Token</span> Name: 
      <span class="hljs-keyword">Token</span> Symbol: 
      <span class="hljs-keyword">Token</span> Description: 
      <span class="hljs-keyword">Token</span> Decimals: 
      <span class="hljs-keyword">Token</span> <span class="hljs-keyword">contract</span> Address: 
      <span class="hljs-keyword">Token</span> Image svg:
      <span class="hljs-keyword">Token</span> Image png:
      <span class="hljs-keyword">Token</span>/Project website:
      <span class="hljs-keyword">Token</span> Coingecko ID:
      <span class="hljs-keyword">Token</span> Coinmarketcap ID
    </code>
  </pre>
</body>
</html>
`


try {
  let dirname = `${path.resolve()}/build`
  if(!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, true);
  }

  // write template
  fs.writeFileSync(`${dirname}/index.html`, template);

  // write tokens
  let nets = [ "mainnet", "testnetv4" ]
  nets.map(async (net) => {
    let tokens = await buildList(net);
    let tokenList = JSON.stringify(tokens, null, 2)
    fs.writeFileSync(`${dirname}/${net}.json`, tokenList);
  })
} catch (error) {
  console.log(error)
}