const Data = require('./data');
const utils = require('./utils');

function findDuplicates(collection, xwsIdFn, ignore = []) {
  const duplicates = [];

  collection.reduce((acc, item) => {
    const xwsId = xwsIdFn(item);

    if (xwsId in acc && ignore.indexOf(xwsId) === -1) {
      duplicates.push(xwsId);
    }
    acc[xwsId] = true;
    return acc;
  }, {});

  return duplicates;
}

describe('XWS Spec', function() {
  test('Upgrade XWS ids are unique', () => {
    const duplicates = findDuplicates(Data.upgrades, item => item.xws, [
      // As dual cards are represented as seperate entries we'll have to ignore them :(
      'adaptability',
      'pivotwing',
      'arccaster',
      'intensity',
      'servomotorsfoils',
    ]);

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Pilot XWS ids are unique', () => {
    const duplicates = findDuplicates(Data.pilots, item =>
      [utils.subfaction2faction(item.faction), item.ship, item.xws].join('\\')
    );

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Ship XWS ids are unique', () => {
    const duplicates = findDuplicates(Data.ships, item => item.xws);

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });

  test('Condition XWS ids are unique', () => {
    const duplicates = findDuplicates(Data.conditions, item => item.xws);

    if (duplicates.length) {
      throw new Error(`Duplicate XWS ids: ${duplicates.join(', ')}`);
    }
  });
});
