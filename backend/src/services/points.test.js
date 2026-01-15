const {
  calculatePlayerPoints,
  calculateTeamPoints,
} = require('./points.service');

// Jugadores fake (simulan una fecha del fútbol uruguayo)
const player1 = {
  id: 1,
  name: 'Goalkeeper Example',
  position: 'goalkeeper',
  minutesPlayed: 90,
  goals: 0,
  assists: 0,
  cleanSheet: true,
  yellowCards: 0,
  redCards: 0,
  ownGoals: 0,
  missedPenalties: 0,
  saves: 6,
};

const player2 = {
  id: 2,
  name: 'Defender Example',
  position: 'defender',
  minutesPlayed: 90,
  goals: 1,
  assists: 0,
  cleanSheet: true,
  yellowCards: 1,
  redCards: 0,
  ownGoals: 0,
  missedPenalties: 0,
};

const player3 = {
  id: 3,
  name: 'Forward Example',
  position: 'forward',
  minutesPlayed: 75,
  goals: 2,
  assists: 1,
  cleanSheet: false,
  yellowCards: 0,
  redCards: 0,
  ownGoals: 0,
  missedPenalties: 0,
};

const benchPlayer = {
  id: 4,
  name: 'Midfielder Bench',
  position: 'midfielder',
  minutesPlayed: 60,
  goals: 1,
  assists: 0,
  cleanSheet: true,
  yellowCards: 0,
  redCards: 0,
  ownGoals: 0,
  missedPenalties: 0,
};

// Equipo fake
const team = {
  startingXI: [player1, player2, player3],
  bench: [benchPlayer],
  captainId: 3,
};

// Test individual
console.log('Player 1 points:', calculatePlayerPoints(player1));
console.log('Player 2 points:', calculatePlayerPoints(player2));
console.log('Player 3 points:', calculatePlayerPoints(player3));

// Test equipo
console.log('Team total points:', calculateTeamPoints(team));
