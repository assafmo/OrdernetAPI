#!/usr/bin/env node

const lib = require("./lib.js");

const yargs = require("yargs");
const argv = yargs
  .example(
    "$0 -u 1234 -p abcd -b nesua",
    "Print the balance for each account associated with this Spark user."
  )
  .example(
    "$0 -u 1234 -p abcd -a ACC_000-111111 -b nesua",
    "Print the balance only for the account key ACC_000-111111."
  )
  .example(
    "$0 -u 1234 -p abcd -a ACC_000-111111 -a ACC_000-222222 -b nesua",
    "Print the balance only for the account keys ACC_000-111111 and ACC_000-222222."
  )
  // user
  .string("u")
  .alias("u", "user")
  .alias("u", "username")
  .describe("u", "Username for login into Spark.")
  // password
  .string("p")
  .alias("p", "pass")
  .alias("p", "password")
  .describe("p", "Password for login into Spark.")
  // boker
  .string("b")
  .alias("b", "broker")
  .choices("b", ["nesua", "meitav", "psagot"])
  .describe("b", "Broker name.")
  // account key
  .array("a")
  .alias("a", "account-key")
  .describe(
    "a",
    'Print balance only for these account keys. This is usually much faster. An account key has the form "ACC_XXX-YYYYYY". You can find it out using the --verbose flag.'
  )
  // verbose
  .boolean("v")
  .alias("v", "verbose")
  .describe("v", "Print log messages")
  // global config
  .wrap(yargs.terminalWidth())
  .demandOption(["p", "u", "b"])
  .alias("h", "help")
  .alias("V", "version")
  .epilogue("For more info visit https://github.com/assafmo/OrdernetAPI").argv;

function info(text) {
  if (argv.verbose) {
    console.error(`[${new Date().toJSON()}] [INFO] ${text}`);
  }
}

(async () => {
  info(
    `Login in to https://spark${argv.broker}.ordernet.co.il with user ${argv.username}...`
  );
  await lib.authenticate(argv.username, argv.password, argv.broker);

  let accounts = [];
  if (!Array.isArray(argv["account-key"])) {
    info("Getting account keys...");
    accounts = await lib.getAccounts();

    info(
      `Account keys found (${accounts.length}): ${accounts
        .map((a) => a.key)
        .join(", ")}`
    );
  } else {
    accounts = argv["account-key"].map((k) => ({
      key: k,
      number: lib.accountKeyToNumber(k),
    }));
  }

  for (const a of accounts) {
    info(`Getting balance for account ${a.number} (account key ${a.key})...`);
    const balance = await lib.getAccountBalance(a);
    console.log(a.number, balance);
  }

  process.exit(0);
})();
