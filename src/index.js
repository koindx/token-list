const buildList = require('./build');
const fs = require("fs");
const path = require("path");

try {
  let dirname = `${path.resolve()}/build`
  if(!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, true);
  }

  let nets = [ "mainnet", "testnetv4" ]
  nets.map(async (net) => {
    let tokens = await buildList(net);
    let tokenList = JSON.stringify(tokens, null, 2)
    console.log(`${dirname}/${net}.json`)
    fs.writeFileSync(`${dirname}/${net}.json`, tokenList);
  })
} catch (error) {
  console.log(error)
}