var fs = require("fs");
var Ajv = require("ajv");
var AjvMergePatch = require("ajv-merge-patch");


var definitionsSchema = JSON.parse(fs.readFileSync("schemas/definitions.json"));

function getSchema(path) {
  var pathSchema = JSON.parse(fs.readFileSync(path));

  var ajv = Ajv({
    allErrors: true,
    v5: true,
    verbose: true,
    schemas: [
      pathSchema,
      definitionsSchema
    ]
  });
  AjvMergePatch(ajv);
  return  ajv.getSchema(pathSchema.id);
}

var schemas = {
  conditions: getSchema("schemas/conditions.json"),
  damageDeck: getSchema("schemas/damage-deck.json"),
  pilots: getSchema("schemas/pilots.json"),
  referenceCards: getSchema("schemas/reference-cards.json"),
  ships: getSchema("schemas/ships.json"),
  sources: getSchema("schemas/sources.json"),
  upgrades: getSchema("schemas/upgrades.json")
};

module.exports = schemas;
