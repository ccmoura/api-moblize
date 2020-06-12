import ExpressBrute from 'express-brute';

const store = new ExpressBrute.MemoryStore(); // change this in production

export default new ExpressBrute(store, {
  freeRetries: 6,
  minWait: 4 * 60 * 1000, // 4 min
  maxWait: 60 * 60 * 1000, // 1 hour
});
