/**
 * Fantasy Fútbol Uruguayo – Motor de Puntos
 * Temporada 2026
 * 
 * Código en inglés
 * Comentarios en español
 * 
 * Este archivo NO depende de base de datos ni frontend.
 * Es lógica pura del juego.
 */

// Puntos por posición
const POSITION_POINTS = {
  goalkeeper: {
    appearance: 2,
    cleanSheet: 4,
    goal: 6,
    assist: 3,
    save: 1, // cada 3 atajadas
  },
  defender: {
    appearance: 2,
    cleanSheet: 4,
    goal: 6,
    assist: 3,
  },
  midfielder: {
    appearance: 2,
    goal: 5,
    assist: 3,
    cleanSheet: 1,
  },
  forward: {
    appearance: 2,
    goal: 4,
    assist: 3,
  },
};

// Penalizaciones generales
const PENALTIES = {
  yellowCard: -1,
  redCard: -3,
  ownGoal: -2,
  missedPenalty: -2,
};

// Bonus por minutos
function getMinutesPoints(minutesPlayed) {
  if (minutesPlayed >= 60) return 2;
  if (minutesPlayed > 0) return 1;
  return 0;
}

// Cálculo de puntos por jugador
function calculatePlayerPoints(playerStats) {
  const {
    position,
    minutesPlayed,
    goals,
    assists,
    cleanSheet,
    yellowCards,
    redCards,
    ownGoals,
    missedPenalties,
    saves,
  } = playerStats;

  let points = 0;
  const positionRules = POSITION_POINTS[position];

  // Minutos jugados
  points += getMinutesPoints(minutesPlayed);

  // Goles
  if (goals && positionRules.goal) {
    points += goals * positionRules.goal;
  }

  // Asistencias
  if (assists && positionRules.assist) {
    points += assists * positionRules.assist;
  }

  // Valla invicta
  if (cleanSheet && positionRules.cleanSheet && minutesPlayed >= 60) {
    points += positionRules.cleanSheet;
  }

  // Atajadas (solo arqueros)
  if (position === 'goalkeeper' && saves) {
    points += Math.floor(saves / 3) * positionRules.save;
  }

  // Penalizaciones
  if (yellowCards) {
    points += yellowCards * PENALTIES.yellowCard;
  }

  if (redCards) {
    points += redCards * PENALTIES.redCard;
  }

  if (ownGoals) {
    points += ownGoals * PENALTIES.ownGoal;
  }

  if (missedPenalties) {
    points += missedPenalties * PENALTIES.missedPenalty;
  }

  return points;
}

// Capitán
function applyCaptain(points, isCaptain) {
  return isCaptain ? points * 2 : points;
}

// Auto-subs (simplificado)
function applyAutoSubs(startingXI, bench) {
  const finalXI = [...startingXI];

  bench.forEach((benchPlayer) => {
    const needsSub = finalXI.find(
      (p) => p.minutesPlayed === 0 && p.position === benchPlayer.position
    );

    if (needsSub && benchPlayer.minutesPlayed > 0) {
      const index = finalXI.indexOf(needsSub);
      finalXI[index] = benchPlayer;
    }
  });

  return finalXI;
}

// Cálculo total del equipo
function calculateTeamPoints(team) {
  const { startingXI, bench, captainId } = team;

  const finalXI = applyAutoSubs(startingXI, bench);

  let totalPoints = 0;

  finalXI.forEach((player) => {
    let playerPoints = calculatePlayerPoints(player);

    if (player.id === captainId) {
      playerPoints = applyCaptain(playerPoints, true);
    }

    totalPoints += playerPoints;
  });

  return totalPoints;
}

module.exports = {
  calculatePlayerPoints,
  calculateTeamPoints,
};
