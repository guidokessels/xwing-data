var fs = require("fs");

var Data = require("./data");
var moment = require("moment");
var utils = require("./utils");

describe("All data", function() {
  describe("in sources.js", function() {
    describe("that have 'release_date' value", function() {
      test("should have an 'announcement_date' that comes before it", function() {
        var errors = [];
        var source;

        for (var i = 0; i < Data.sources.length; i++) {
          source = Data.sources[i];

          if (source.release_date && source.announcement_date) {
            if (!moment(source.announcement_date).isBefore(moment(source.release_date))) {
              errors.push(
                utils.buildDataHeader(Data, "sources", i) +
                ": 'announcement_date' should come before 'release_date'."
              )
            }
          }
        }
        utils.outputAllErrors(errors);
      });
    });

    describe("that have 'release_date' value in the past", function() {
      test("should have 'released' value set to true", function() {
        var errors = [];
        var source;
        var now = moment();

        for (var i = 0; i < Data.sources.length; i++) {
          source = Data.sources[i];

          if (source.release_date && now.isAfter(moment(source.release_date))) {
            if (!source.released) {
              errors.push(
                utils.buildDataHeader(Data, "sources", i) +
                ": 'released' field should be true, but it's set to " + source.released + "."
              );
            }
          }
        }
        utils.outputAllErrors(errors);
      });
    });

    describe("that has the 'released' field set to true", function() {
      test("should have a 'release_date' value", function() {
        var errors = [];
        var source;

        for (var i = 0; i < Data.sources.length; i++) {
          source = Data.sources[i];

          if (source.released && typeof source.release_date === "undefined") {
            errors.push(
              utils.buildDataHeader(Data, "sources", i) +
              ": 'released' field is true, but 'release_date' is undefined."
            )
          }
        }
        utils.outputAllErrors(errors);
      });
    });
  });

  describe("that has an image file path", function() {
    test("should have a matching image file in the images directory", function() {
      var errors = [];
      var modelData;

      for (var dataKey in Data) {
          if (Data.hasOwnProperty(dataKey)) {

            for (var i = 0; i < Data[dataKey].length; i++) {
              modelData = Data[dataKey][i];

              if (modelData.image && !fs.existsSync("images/" +  modelData.image)) {
                  errors.push(
                    utils.buildDataHeader(Data, dataKey, i) +
                    ": file 'images/" + modelData.image + "' was not found."
                  )
              }

              if (modelData.thumb && !fs.existsSync("images/" + modelData.thumb)) {
                  errors.push(
                    utils.buildDataHeader(Data, dataKey, i) +
                    ": file 'images/" + modelData.thumb + "' was not found."
                  )
              }
            }
          }
      }
      utils.outputAllErrors(errors);
    })
  })

  describe("in ships.js", function() {
    test("only has factions matching the ones in pilots.js", function() {
      var pilotFactions = {};
      var errors = [];
      var shipFactions, i, j;

      for (i = 0; i < Data.pilots.length; i++) {
        if (!pilotFactions[Data.pilots[i].ship]) {
          pilotFactions[Data.pilots[i].ship] = [];
        }
        if (pilotFactions[Data.pilots[i].ship].indexOf(Data.pilots[i].faction) === -1) {
          pilotFactions[Data.pilots[i].ship].push(Data.pilots[i].faction);
        }
      }

      for (i = 0; i < Data.ships.length; i++) {
        shipFactions = Data.ships[i].faction.slice();
        pilotFactions[Data.ships[i].name];

        for (j = 0; j < shipFactions.length; j++) {
          if (pilotFactions[Data.ships[i].name].indexOf(shipFactions[j]) === -1) {
            errors.push(utils.buildDataHeader(Data, 'ships', i) +
            ": has faction '" +
            shipFactions[j] +
            "' but has no pilots with that faction");
          }
        }

        for (j = 0; j < pilotFactions[Data.ships[i].name].length; j++) {
          if (shipFactions.indexOf(pilotFactions[Data.ships[i].name][j]) === -1) {
            errors.push(utils.buildDataHeader(Data, 'ships', i) +
            ": does not have faction '" +
            pilotFactions[Data.ships[i].name][j] +
            "' but it does have pilots with that faction");
          }
        }
      }

      utils.outputAllErrors(errors);
    });
  });

  describe("in pilots.js", function() {
    test("only references ships that exists in ships.js", function() {
      var shipNames = [];
      var errors = [];
      var i;

      for (i = 0; i < Data.ships.length; i++) {
        shipNames.push(Data.ships[i].name);
      }

      for (i = 0; i < Data.pilots.length; i++) {
        if (shipNames.indexOf(Data.pilots[i].ship) === -1) {
          errors.push(utils.buildDataHeader(Data, 'pilots', i) +
          ": ship '" + Data.pilots[i].ship +
          "' does not exist in ships.js");
        }
      }

      utils.outputAllErrors(errors);
    });
  });
});
