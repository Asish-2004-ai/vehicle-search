function getEstimatedRideDurationHours(from, to) {
  return Math.abs(parseInt(to) - parseInt(from)) % 24;
}

module.exports = getEstimatedRideDurationHours;
