var fs = require("fs");

function getData(path) {
  return JSON.parse(fs.readFileSync(path))
}

var data = {
  conditions: getData("data/conditions.js"),
  damageDeckCore: getData("data/damage-deck-core.js"),
  damageDeckCoreTfa: getData("data/damage-deck-core-tfa.js"),
  damageDeckRebelTransport: getData("data/damage-deck-rebel-transport.js"),
  pilots: getData("data/pilots.js"),
  referenceCards: getData("data/reference-cards.js"),
  ships: getData("data/ships.js"),
  sources: getData("data/sources.js"),
  upgrades: getData("data/upgrades.js")
};

module.exports = data;