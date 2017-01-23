var assert = require("assert");


var DATASET_HEADER_MAP = {
  conditions: "Condition",
  damageDeckCore: "DamageDeckCore",
  damageDeckCoreTfa: "DamageDeckCore",
  pilots: "Pilot",
  referenceCards: "ReferenceCard",
  ships: "Ship",
  sources: "Source",
  upgrades: "Upgrade",
};

function buildDataHeader(data, dataKey, index) {
  var dataHeader;
  var header = DATASET_HEADER_MAP[dataKey];
  var model = data[dataKey][index];

  if (typeof model.id !== "undefined" && model.name) {
    dataHeader = "\t<" + header + " id=" + model.id + " name=\"" + model.name + "\">";
  } else if (typeof model.id !== "undefined") {
    dataHeader = "\t<" + header + " id=" + model.id + ">";
  } else if (model.name) {
    dataHeader = "\t<" + header + " name=\"" + model.name + "\">";
  } else {
    dataHeader = "\t<" + header + " index=" + index + ">";
  }

  return dataHeader
}

function outputAllErrors(errors) {
  if (errors.length > 0) {
    assert.fail(
      errors.length + " Validation Errors",
      "0 Validation Errors" ,
      "\n" + errors.join("\n")
    );
  }
}

module.exports = {
  buildDataHeader: buildDataHeader,
  outputAllErrors: outputAllErrors,
};