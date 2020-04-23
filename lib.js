const axios = require("axios");

const config = {
  apiUrl: null,
  authorization: null,
};

/**
 *  Authenticate against the Spark system of the broker. This function initializes the `apiUrl` and `authorization` fields in the internal config, so that we won't have to authenticate again for each API call. Uses /api/Auth/Authenticate.
 *  @param {string} username - The Spark username
 *  @param {string} password - The Spark password
 *  @param {string} broker - Used to get the API URL like this: `https://spark${broker}.ordernet.co.il/api`. E.g. "nesua", "meitav", "psagot"
 *  @returns {Void}
 */
async function authenticate(username, password, broker) {
  config.apiUrl = `https://spark${broker}.ordernet.co.il/api`;

  const authRes = await axios.post(`${config.apiUrl}/Auth/Authenticate`, {
    username,
    password,
  });

  config.authorization = `Bearer ${authRes.data.l}`;
}

/**
 * @typedef {Object} Account
 * @property {string} key - The account key for API usage (ACC_000-XYZ)
 * @property {string} name - The name listed on the account
 * @property {number} number - The account number (XYZ)
 */

/**
 *  Get all the accounts listed under this Spark user. Uses /api/DataProvider/GetStaticData.
 *  @returns {Array.<Account>} - All accounts listed under this Spark user
 */
async function getAccounts() {
  const getStaticDataRes = await axios.get(
    `${config.apiUrl}/DataProvider/GetStaticData`,
    {
      headers: {
        authorization: config.authorization,
      },
    }
  );

  const accounts = getStaticDataRes.data
    .filter((x) => x.b == "ACC")[0]
    .a.map((x) => ({ key: x._k, number: x.a.b, name: x.a.e }));

  return accounts;
}

/**
 *  Get total balance of an account. Uses /api/Account/GetAccountSecurities.
 *  @param {Account} account - Account to get balance for
 *  @returns {number} - Total balance of the account
 */
async function getAccountBalance(account) {
  const result = await axios(
    `${config.apiUrl}/Account/GetAccountSecurities?accountKey=${account.key}`,
    {
      headers: {
        authorization: config.authorization,
      },
    }
  );
  return result.data.a.o;
}

module.exports = {
  config,
  authenticate,
  getAccounts,
  getAccountBalance,
};
