const { version } = require("../package.json");
const tesnetv4 = require("./tokens/testnetv4.json")
const harbinger  = require("./tokens/harbinger.json")
const mainnet  = require("./tokens/mainnet.json")

async function buildList(network) {
  let chain = ""
  let tokens = {};
  switch (network) {
    case "testnetv4":
      chain = tesnetv4.chainId;
      tokens = tesnetv4.tokens;
      break;
    case "mainnet":
      chain = mainnet.chainId;
      tokens = mainnet.tokens;
    case "harbinger":
      chain = harbinger.chainId;
      tokens = harbinger.tokens;
      break;
    default:
      break;
  }
  const parsed = version.split(".");
  const list = {
    name: `Koindx token list ${network}`,
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    keywords: ["koindx", network],
    chain: chain,
    tokens: tokens,
  };
  return list;
};

module.exports = buildList;