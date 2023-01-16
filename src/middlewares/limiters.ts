import rateLimit from 'express-rate-limit';

export const loginAccountLimiter = rateLimit({
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  max: 10, // Limit each IP to create account requests per `window`
  message: 'Too many API request from this IP, please try again after 15 min.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  windowMs: 15 * 60 * 1000, // 15 minutes
});
