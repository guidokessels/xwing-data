var assert = require("assert");
var fs = require("fs");

var Data = require("./data");
var moment = require("moment");
var utils = require("./utils");


describe("All data", function() {
  describe("in sources.js", function() {
    describe("that have 'release_date' value", function() {
      it("should have an 'announcement_date' that comes before it", function() {
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
      it("should have 'released' value set to true", function() {
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
      it("should have a 'release_date' value", function() {
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
    it("should have a matching image file in the images directory", function() {
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
});
