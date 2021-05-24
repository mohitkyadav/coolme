const generalHelpers = {};

generalHelpers.coinToss = () => {
  const isHeads = Math.floor(Math.random() * 2) == 0

  return isHeads ? 'Heads it is!' : 'Tails'
}

module.exports = generalHelpers;
