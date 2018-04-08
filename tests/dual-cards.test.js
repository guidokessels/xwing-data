const Data = require('./data');

describe('Dual Cards', () => {
  test('have matching `dualCard` values', () => {
    const dualCards = Data.upgrades.filter(card => 'dualCard' in card);

    expect(dualCards.length).toBeGreaterThan(0);

    const dualCardsById = dualCards.reduce((aq, card) => {
      aq[card.id] = card;
      return aq;
    }, {});

    const errors = [];

    Object.keys(dualCardsById).forEach(id => {
      const card = dualCardsById[id];
      const otherSideId = card.dualCard;

      if (!dualCardsById[otherSideId]) {
        // Make sure the other side exists
        errors.push(
          `Dual card "${card.name}" (id=${id}) references other side with id=${otherSideId} which is not a dual card.`
        );
      } else if (dualCardsById[otherSideId].dualCard != id) {
        // Make sure the other side references this side
        errors.push(
          `Dual card "${card.name}" (id=${id}) references other side with id=${otherSideId} which does not reference this side back.`
        );
      } else if (card.xws !== dualCardsById[otherSideId].xws) {
        // Make sure both cards use the same XWS
        errors.push(
          `Dual card "${card.name}" (id=${id}) references other side with id=${otherSideId} which does not match XWS id: "${card.xws}" vs "${dualCardsById[otherSideId].xws}".`
        );
      }
    });

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  });
});
