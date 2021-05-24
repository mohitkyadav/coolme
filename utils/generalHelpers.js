const generalHelpers = {};

generalHelpers.coinToss = () => {
  const isHeads = Math.floor(Math.random() * 2) == 0;

  return isHeads ? 'Heads it is!' : 'Tails';
}

generalHelpers.randInt = () => {
  const num = Math.floor(Math.random() * 1000)

  if (num === 1) {
    return `Number ${num}, just like you 😉.`;
  }

  if (num === 69) {
    return `${num}, lucky you 😉.`;
  }

  if (num === 0) {
    return `${num}, and let there be light.`;
  }

  if (num === 420) {
    return `${num}, be careful.`;
  }

  return `${num} is your number.`;
}

module.exports = generalHelpers;
