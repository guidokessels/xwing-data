const Data = require("./data");

it('Twin Ion Engine Mk. II should work on all TIE ships', () => {
  const twinIonUpgrade = Data.upgrades.find(u => u.id === 190);
  expect(twinIonUpgrade.name).toEqual('Twin Ion Engine Mk. II');

  const tieShips = Data.ships
    .filter(s => s.name.match(/TIE/))
    .map(s => s.name)
    .sort();

  expect(twinIonUpgrade.ship).toEqual(tieShips);
});
