const Data = require('./data');
const utils = require('./utils');

describe('XWS Spec', function() {
  test('Upgrade XWS ids are unique', () => {
    const duplicates = [];
    // As dual cards are represented as seperate entries we'll have to ignore them :(
    const dualCards = ['adaptability', 'pivotwing', 'arccaster', 'intensity'];

    Data.upgrades.reduce((aq, item) => {
      const xwsId = item.xws;

      if (xwsId in aq && dualCards.indexOf(xwsId) === -1) {
        duplicates.push(xwsId);
      }
      aq[xwsId] = true;
      return aq;
    }, {});

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Pilot XWS ids are unique', () => {
    const duplicates = [];

    Data.pilots.reduce((aq, item) => {
      const xwsId = [utils.subfaction2faction(item.faction), item.ship, item.xws].join('\\');

      if (xwsId in aq) {
        duplicates.push(xwsId);
      }
      aq[xwsId] = true;
      return aq;
    }, {});

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Ship XWS ids are unique', () => {
    const duplicates = [];

    Data.ships.reduce((aq, item) => {
      const xwsId = item.xws;

      if (xwsId in aq) {
        duplicates.push(xwsId);
      }
      aq[xwsId] = true;
      return aq;
    }, {});

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Condition XWS ids are unique', () => {
    const duplicates = [];

    Data.conditions.reduce((aq, item) => {
      const xwsId = item.xws;

      if (xwsId in aq) {
        duplicates.push(xwsId);
      }
      aq[xwsId] = true;
      return aq;
    }, {});

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });
});
