var assert = require("assert");
var Data = require("./data");
var Schema = require("./schema");


function validateData(header, data, schema) {
    var errors = [];
    var errorText;

    for (var i = 0; i < data.length; i++) {
      if (!schema(data[i])) {

        if (data[i].id && data[i].name) {
          errorText = "\t<" + header + " id=" + data[i].id + " name=\"" + data[i].name + "\">:\n\t\t";
        } else if (data[i].id) {
          errorText = "\t<" + header + " id=" + data[i].id + ">:\n\t\t";
        } else if (data[i].name) {
          errorText = "\t<" + header + " name=\"" + data[i].name + "\">:\n\t\t";
        } else {
          errorText = "\t<" + header + " index=" + i.toString() + ">:\n\t\t";
        }
        for (var j = 0; j < schema.errors.length; j++) {
          errorText += "- ";
          if (schema.errors[j].dataPath && schema.errors[j].dataPath != "") {
            errorText += schema.errors[j].dataPath + " ";
          }

          errorText += schema.errors[j].message;

          if (schema.errors[j].keyword == "additionalProperties") {
            errorText += " (" + schema.errors[j].params.additionalProperty + ")";
          }

          errorText += "\n\t\t"
        }

        errors.push(errorText);
      }
    }

    if (errors.length > 0) {
      assert.fail(
        errors.length.toString() + " Validation Errors",
        "0 Validation Errors" ,
        "\n" + errors.join("\n")
      );
    }
}


describe("All data", function() {
  describe("in conditions.js", function() {
    it("should validate against conditions schema", function() {
      validateData("Condition", Data.conditions, Schema.conditions);
    });
  });

  describe("in damage-deck-core.js", function() {
    it("should validate against damage-deck schema", function() {
      validateData("DamageDeckCore", Data.damageDeckCore, Schema.damageDeck);
    });
  });

  describe("in damage-deck-core-tfa.js", function() {
    it("should validate against damage-deck schema", function() {
      validateData("DamageDeckCoreTfa", Data.damageDeckCoreTfa, Schema.damageDeck);
    });
  });

  describe("in pilots.js", function() {
    it("should validate against pilots schema", function() {
      validateData("Pilot", Data.pilots, Schema.pilots);
    });
  });

  describe("in ships.js", function() {
    it("should validate against ships schema", function() {
      validateData("Ship", Data.ships, Schema.ships);
    });
  });

  describe("in sources.js", function() {
    it("should validate against sources schema", function() {
      validateData("Source", Data.sources, Schema.sources);
    });
  });

  describe("in upgrades.js", function() {
    it("should validate against upgrades schema", function() {
      validateData("Upgrade", Data.upgrades, Schema.upgrades);
    });
  });
});


