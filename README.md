# OrdernetCLI

A simple CLI for querying `CLI for querying https://spark{nesua,meitav,psagot}.ordernet.co.il/api`.  
This probably should not be exposed to end users. :-)

[![npm version](https://badge.fury.io/js/ordernet-cli.svg)](https://badge.fury.io/js/ordernet-cli)

# Installation

```bash
npm install -g ordernet-cli
```

# Options

```console
$ ordernet-cli -h
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
