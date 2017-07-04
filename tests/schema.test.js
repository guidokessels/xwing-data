var Data = require("./data");
var Schema = require("./schema");
var utils = require("./utils");


function validateData(data, dataKey, schema) {
    var errors = [];
    var errorText;

    for (var i = 0; i < data[dataKey].length; i++) {
      if (!schema(data[dataKey][i])) {
        errorText = utils.buildDataHeader(data, dataKey, i) + ':\n\t\t';

        for (var j = 0; j < schema.errors.length; j++) {
          errorText += "- ";
          if (schema.errors[j].dataPath && schema.errors[j].dataPath != "") {
            errorText += schema.errors[j].dataPath + " ";
          }

          errorText += schema.errors[j].message;

          if (schema.errors[j].keyword == "additionalProperties") {
            errorText += " (" + schema.errors[j].params.additionalProperty + ")";
          }

          errorText += "\n\t\t";
        }

        errors.push(errorText);
      }
    }

    utils.outputAllErrors(errors);
}


describe("All data", function() {
  describe("in conditions.js", function() {
    test("should validate against conditions schema", function() {
      validateData(Data, "conditions", Schema.conditions);
    });
  });

  describe("in damage-deck-core.js", function() {
    test("should validate against damage-deck schema", function() {
      validateData(Data, "damageDeckCore", Schema.damageDeck);
    });
  });

  describe("in damage-deck-core-tfa.js", function() {
    test("should validate against damage-deck schema", function() {
      validateData(Data, "damageDeckCoreTfa", Schema.damageDeck);
    });
  });

  describe("in damage-deck-rebel-transport.js", function() {
    test("should validate against damage-deck schema", function() {
      validateData(Data, "damageDeckRebelTransport", Schema.damageDeck);
    });
  });

  describe("in pilots.js", function() {
    test("should validate against pilots schema", function() {
      validateData(Data, "pilots", Schema.pilots);
    });
  });

  describe("in reference-cards.js", function() {
    test("should validate against reference-cards schema", function() {
      validateData(Data, "referenceCards", Schema.referenceCards);
    });
  });

  describe("in ships.js", function() {
    test("should validate against ships schema", function() {
      validateData(Data, "ships", Schema.ships);
    });
  });

  describe("in sources.js", function() {
    test("should validate against sources schema", function() {
      validateData(Data, "sources", Schema.sources);
    });
  });

  describe("in upgrades.js", function() {
    test("should validate against upgrades schema", function() {
      validateData(Data, "upgrades", Schema.upgrades);
    });
  });
});


