var glob = require('glob');

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
      var allImages = glob.sync("images/**/*");
      var errors = [];
      var modelData;

      for (var dataKey in Data) {
          if (Data.hasOwnProperty(dataKey)) {

            for (var i = 0; i < Data[dataKey].length; i++) {
              modelData = Data[dataKey][i];

              if (modelData.image && allImages.indexOf(`images/${modelData.image}`) === -1) {
                  errors.push(
                    utils.buildDataHeader(Data, dataKey, i) +
                    ": file 'images/" + modelData.image + "' was not found."
                  )
              }

              if (modelData.thumb && allImages.indexOf(`images/${modelData.thumb}`) === -1) {
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
    test("should be in the correct folder", function() {
      var errors = [];

      ['pilots', 'upgrades'].forEach(dataKey => {
        Data[dataKey].forEach(({ image, faction, slot }, i) => {
          if (image) {
            if (
              (dataKey === 'pilots' && !image.startsWith(`pilots/${faction}/`)) ||
              (dataKey === 'upgrades' && !image.startsWith(`upgrades/${slot}/`))
            ) {
              errors.push(
                utils.buildDataHeader(Data, dataKey, i) +
                ": image is in incorrect folder '" + image + "'."
              )
            }
          }
        })
      })
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

  describe('in sources.js', function () {
    ['upgrades', 'pilots', 'conditions', 'ships'].forEach(function (type) {
      test("all " + type + " belong to at least 1 expansion pack", function () {
        var idsInPack = [];
        var errors = [];
        var ids;
        var i;

        for (i = 0; i < Data.sources.length; i++) {
          if (Data.sources[i].contents[type]) {
            ids = Object.keys(Data.sources[i].contents[type]).map(d => parseInt(d, 10));
            idsInPack = idsInPack.concat(ids);
          }
        }

        for (i = 0; i < Data[type].length; i++) {
          if (idsInPack.indexOf(Data[type][i].id) === -1) {
            errors.push(utils.buildDataHeader(Data, type, i) +
              ": does not belong to any expansion pack");
          }
        }

        utils.outputAllErrors(errors);
      });
    });
  });
});
