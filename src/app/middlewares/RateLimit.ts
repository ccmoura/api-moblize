import RateLimit from 'express-rate-limit';

export default RateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100,
  message: 'You have exceeded 100 requests in 24 hrs.',
  headers: true,
});
