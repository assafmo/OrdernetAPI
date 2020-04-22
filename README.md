# OrdernetAPI

A simple tool for querying `https://spark{nesua,meitav,psagot}.ordernet.co.il/api`.  
Right now only returns total balance for each account.

[![npm version](https://badge.fury.io/js/ordernet-api.svg)](https://badge.fury.io/js/ordernet-api)

# Installation

```bash
npm install -g ordernet-api
```

# Options

```console
$ ordernet-api -h
Options:
  -u, --username  Spark Username                                      [required]
  -p, --password  Spark Password                                      [required]
  -b, --broker    Broker. Must be "nesua", "meitav" or "psagot"       [required]
  -v, --verbose   Print log messages                                   [boolean]
  -h, --help      Show help                                            [boolean]
  -V, --version   Show version number                                  [boolean]
```

# Refs

- https://github.com/danielbraun/ordernet-scraper
