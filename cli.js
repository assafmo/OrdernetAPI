#!/usr/bin/env node

const lib = require("./lib.js");
const argv = require("yargs")
  .example(
    "$0 -u 1234 --p abcd -b nesua",
    "Prints the balance for each account associated with this Spark user."
  )
  .alias("u", "username")
  .alias("u", "user")
  .describe("u", "Your Spark username")
  .alias("p", "password")
  .alias("p", "pass")
  .describe("p", "Your Spark password")
  .alias("b", "broker")
  .describe("b", "Your broker")
  .choices("b", ["nesua", "meitav", "psagot"])
  .demandOption(["p", "u", "b"])
  .alias("h", "help")
  .alias("V", "version")
  .boolean("verbose")
  .alias("v", "verbose")
  .describe("v", "Print log messages")
  .epilogue("For more info visit https://github.com/assafmo/OrdernetAPI").argv;

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
