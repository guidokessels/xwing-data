var actions = [
  "Barrel Roll",
  "Boost",
  "Cloak",
  "Coordinate",
  "Evade",
  "Focus",
  "Jam",
  "Recover",
  "Reinforce",
  "Reload",
  "Rotate Arc",
  "SLAM",
  "Target Lock"
];

var maneuvers = [
  "Bank Left",
  "Bank Right",
  "Koiogran Turn",
  "Reverse Bank Left",
  "Reverse Bank Right",
  "Reverse Straight",
  "Segnor's Loop Left",
  "Segnor's Loop Right",
  "Stop",
  "Straight",
  "Tallon Roll Left",
  "Tallon Roll Right",
  "Turn Left",
  "Turn Right"
];

var slots = [
  "Astromech",
  "Bomb",
  "Cannon",
  "Cargo",
  "Crew",
  "Elite",
  "Hardpoint",
  "Illicit",
  "Missile",
  "Modification",
  "Salvaged Astromech",
  "System",
  "Team",
  "Tech",
  "Torpedo",
  "Turret"
];

var symbols = [
  "Critical Hit",
  "Evade",
  "Focus",
  "Hit"
];

module.exports = {
  slots: slots,
  maneuvers: maneuvers,
  actions: actions,
  symbols: symbols,
  all: [].concat(actions, maneuvers, slots, symbols)
};
