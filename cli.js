#!/usr/bin/env node

const lib = require("./lib.js");
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

function info(text) {
  argv.verbose && console.error(`[${new Date().toJSON()}] [INFO] ${text}`);
}

(async () => {
  info(`Authenticating ${argv.broker} with Spark user ${argv.username}...`);
  await lib.authenticate(argv.username, argv.password, argv.broker);

  info("Getting account numbers...");
  const accounts = await lib.getAccounts();

  info(
    `Accounts found (${accounts.length}): ${accounts
      .map((a) => a.number)
      .join(", ")}`
  );

  for (const account of accounts) {
    info(`Getting balance for account ${account.number}`);
    const balance = await lib.getAccountBalance(account);
    console.log(account.number, balance);
  }

  process.exit(0);
})();
