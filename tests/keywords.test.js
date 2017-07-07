var Data = require("./data");
var Keywords = require("./keywords");
var utils = require("./utils");

/**
 * This test verifies if the keywords used in card text are correct and consistent.
 *
 * Keywords can be slots, actions, dice symbols or maneuver names, and are expressed
 * as text between square brackets.
 *
 * Examples are:
 *  [Focus]
 *  [Bank Left]
 *  [Crew]
 *  [Torpedo]
 *
 * It is important for these to be written the same everywhere as apps often replace
 * them with icons. If the style is inconsistent (e.g. [Slam] vs [SLAM]) it could lead
 * to some keywords not being matched.
 */

function validateKeywords(dataKey, keywords, textFields) {
  var errors = [];
  var errorText;
  var item;
  var regex = /\[(.*?)\]/g;
  var matches;
  var model = Data[dataKey];
  var keywordErrors = 0;

  for (var i = 0; i < model.length; i++) {
    errorText = '';
    item = model[i];

    for (var j = 0; j < textFields.length; j++) {

      if (textFields[j] in item) {
        while (matches = regex.exec(item[textFields[j]])) {
          if (keywords.indexOf(matches[1]) === -1) {
            errorText += "- Unknown keyword [" + matches[1] + "] in '" +
              textFields[j] + "' field.\n\t\t";
            keywordErrors++;
          }
        }

        if (errorText) {
          errors.push(utils.buildDataHeader(Data, dataKey, i) + ':\n\t\t' + errorText);
        }
      }
    }
  }

  if (keywordErrors > 0) {
    throw new Error(errors.join("\n"));
  }
}

describe("All card text fields", function() {
  describe("in conditions.js", function() {
    test("should use allowed keywords only", function() {
      validateKeywords("conditions", Keywords.all, ['text']);
    });
  });

  describe("in pilots.js", function() {
    test("should use allowed keywords only", function() {
      validateKeywords("pilots", Keywords.all, ['text']);
    });
  });

  describe("in upgrades.js", function() {
    test("should use allowed keywords only", function() {
      validateKeywords("upgrades", Keywords.all, ['text', 'effect']);
    });
  });
});
