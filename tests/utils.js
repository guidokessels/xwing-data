var DATASET_HEADER_MAP = {
  conditions: 'Condition',
  damageDeckCore: 'DamageDeckCore',
  damageDeckCoreTfa: 'DamageDeckCore',
  pilots: 'Pilot',
  referenceCards: 'ReferenceCard',
  ships: 'Ship',
  sources: 'Source',
  upgrades: 'Upgrade',
};

function buildDataHeader(data, dataKey, index) {
  var dataHeader;
  var header = DATASET_HEADER_MAP[dataKey];
  var model = data[dataKey][index];

  if (typeof model.id !== 'undefined' && model.name) {
    dataHeader = '\t<' + header + ' id=' + model.id + ' name="' + model.name + '">';
  } else if (typeof model.id !== 'undefined') {
    dataHeader = '\t<' + header + ' id=' + model.id + '>';
  } else if (model.name) {
    dataHeader = '\t<' + header + ' name="' + model.name + '">';
  } else {
    dataHeader = '\t<' + header + ' index=' + index + '>';
  }

  return dataHeader;
}

function outputAllErrors(errors) {
  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}

function subfaction2faction(subfaction) {
  const map = {
    'Rebel Alliance': 'rebel',
    Resistance: 'rebel',
    'First Order': 'imperial',
    'Galactic Empire': 'imperial',
    'Scum and Villainy': 'scum',
  };

  if (!(subfaction in map)) {
    throw new Error(`Unknown subfaction "${subfaction}"`);
  }

  return map[subfaction];
}

module.exports = {
  buildDataHeader: buildDataHeader,
  outputAllErrors: outputAllErrors,
  subfaction2faction: subfaction2faction,
};
