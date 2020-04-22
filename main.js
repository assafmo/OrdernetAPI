#!/usr/bin/env node

const axios = require("axios");
const argv = require("yargs")
  .alias("u", "username")
  .describe("u", "Spark Username")
  .alias("p", "password")
  .describe("p", "Spark Password")
  .alias("b", "broker")
  .describe("b", 'Broker. Must be "nesua", "meitav" or "psagot"')
  .check(function (argv) {
    return (
      argv.broker == "nesua" ||
      argv.broker == "meitav" ||
      argv.broker == "psagot"
    );
  })
  .demandOption(["p", "u", "b"])
  .alias("h", "help")
  .alias("V", "version")
  .boolean("verbose")
  .alias("v", "verbose")
  .describe("v", "Print log messages").argv;

const apiUrl = `https://spark${argv.broker}.ordernet.co.il/api`;

(async () => {
  info("Authenticating...");
  const authRes = await axios.post(`${apiUrl}/Auth/Authenticate`, {
    username: `${argv.username}`,
    password: `${argv.password}`,
  });
  const authorization = `Bearer ${authRes.data.l}`;

  info("Getting account numbers...");
  const getStaticDataRes = await axios.get(
    `${apiUrl}/DataProvider/GetStaticData`,
    {
      headers: {
        authorization,
      },
    }
  );

  const accountKeys = getStaticDataRes.data
    .filter((x) => x.b == "ACC")[0]
    .a.map((x) => x._k);
  info(
    `Accounts found (${accountKeys.length}): ${accountKeys
      .map(stringifyAccountKey)
      .join(", ")}`
  );
  for (const accKey of accountKeys) {
    info(`Getting balance for account ${stringifyAccountKey(accKey)}`);
    const result = await axios(
      `${apiUrl}/Account/GetAccountSecurities?accountKey=${accKey}`,
      {
        headers: {
          authorization,
        },
      }
    );
    console.log(stringifyAccountKey(accKey), result.data.a.o);
  }
})();

function info(text) {
  argv.verbose && console.error(`[${new Date().toJSON()}] [INFO] ${text}`);
}

function stringifyAccountKey(accKey) {
  return accKey.split("-")[1];
}
