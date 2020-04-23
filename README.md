# OrdernetAPI

A simple tool for querying `https://spark{nesua,meitav,psagot}.ordernet.co.il/api`.  
Right now only returns total balance for each account.

[![npm version](https://badge.fury.io/js/ordernet-api.svg)](https://badge.fury.io/js/ordernet-api)

# Installation

```bash
npm install -g ordernet-api
```

# CLI Options

```console
$ ordernet-api -h
Options:
  -u, --username, --user  Your Spark username                         [required]
  -p, --password, --pass  Your Spark password                         [required]
  -b, --broker            Your broker
                               [required] [choices: "nesua", "meitav", "psagot"]
  -v, --verbose           Print log messages                           [boolean]
  -h, --help              Show help                                    [boolean]
  -V, --version           Show version number                          [boolean]

Examples:
  ordernet-api -u 1234 --p abcd -b nesua  Prints the balance for each account
                                    associated with this Spark user.

For more info visit https://github.com/assafmo/OrdernetAPI
```

# Refs

- https://github.com/danielbraun/ordernet-scraper
