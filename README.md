# X-Wing Data
[![Build Status](https://travis-ci.org/guidokessels/xwing-data.svg?branch=master)](https://travis-ci.org/guidokessels/xwing-data) [![npm version](https://img.shields.io/npm/v/xwing-data.svg?style=flat)](https://www.npmjs.com/package/xwing-data)

An easy-to-use collection of data and images from [X-Wing: The Miniatures Game](https://www.fantasyflightgames.com/en/products/x-wing/) by [Fantasy Flight Games](http://fantasyflightgames.com/).

## What's included

This repository contains data and images for the following components:
- Ships
- Pilots
- Upgrades
- Conditions
- Core Sets and Expansion Packs
- Reference Cards
- Damage Decks

There are two top-level directories; `data` and `images`.

### data

The `data` folder contains all X-Wing data in JSON format.

### images

The `images` folder contains images for each card, product, faction, etc.

## Usage

You can use this data to build your own apps, squad builders, web sites, etc.

The easiest way to do this is via [Bower](http://bower.io/), [Yarn](https://yarnpkg.com/), [npm](https://www.npmjs.com/package/xwing-data) or as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules#Starting-with-Submodules):

* Yarn: `yarn add xwing-data`
* npm: `npm install xwing-data`
* Bower: `bower install xwing-data`
* Git submodule: `git submodule add https://github.com/guidokessels/xwing-data.git`

## Bugs / Issues

Please [open a ticket](https://github.com/guidokessels/xwing-data/issues/new) on Github.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :tada:

When adding images please use [TinyPNG](https://tinypng.com/) to reduce their filesize as much as possible without affecting image quality.

## Projects

A list of projects that use this content:

- [X-Wing Companion](https://play.google.com/store/apps/details?id=com.guidokessels.xwc) (Android App)
- [X-Wing Companion Card Viewer](https://chrome.google.com/webstore/detail/x-wing-companion-card-vie/bilhapljfgefhhepedfaanikpailghbm) (Chrome Extension)
- [X-Wing Overlayer](https://github.com/sheepeatingtaz/xwingoverlayer) (Web App for generating overlays for streaming)
- [X-Streamer](https://github.com/NineWorlds/xstreamer) (Stream overlays)
- [X-Wing VASSAL Module](http://www.vassalengine.org/wiki/Module:Star_Wars:_X-Wing_Miniatures_Game) (X-Wing Module for VASSAL for online play)
- [Meta-Wing](http://meta-wing.com/) (X-Wing Meta Analyzer)
- [X-Wing Data Module](https://github.com/stevegood/xwing-data-module) (xwing-data packaged as modules for JavaScript applications)
- [R2-D7](https://github.com/FreakyDug/r2-d7) (Slack bot that detects X-Wing lists and prints them in chat)

Want your project listed here? [Let us know!](https://github.com/guidokessels/xwing-data/issues/new?title=Add%20Project)

## Versioning

This project uses [SemVer](http://semver.org/). Given a `MAJOR.MINOR.PATCH` version number, we will increment the:
- `MAJOR` version when existing content is changed in such a way that it can break consumers of the data
- `MINOR` version when new content is added in a backwards-compatible manner, or existing content is changed in a backwards-compatible manner
- `PATCH` version when fixing mistakes in existing content

## History

See the [Releases tab](https://github.com/guidokessels/xwing-data/releases) in Github.

## Contributors

- Guido Kessels (mail@guidokessels.com)

The first version of the data was based on Geordan Rosario's squad builder in 2014, found here: https://github.com/geordanr/xwing.

## License
[MIT](http://guidokessels.mit-license.org/)

---

Star Wars, X-Wing: The Miniatures Game and all related properties, images and text are owned by Fantasy Flight Games, Lucasfilm Ltd., and/or Disney.

