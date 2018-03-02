const Data = require("./data");

it('Lightweight Frame should work on all TIE ships that have agility <3', () => {
  const lwfUpgrade = Data.upgrades.find(u => u.id === 296);
  expect(lwfUpgrade.name).toEqual('Lightweight Frame');

  const tieShips = Data.ships
    .filter(s => s.name.match(/TIE/) && s.agility < 3)
    .map(s => s.name)
    .sort();

  expect(lwfUpgrade.ship).toEqual(tieShips);
});
