const express = require('express');
const servicesRoutes = require('./routes/servicesRoutes');
const userRoutes = require('./routes/usersRoutes');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();

app.use(express.json());

// Rate limiting strategies using rate-limiter-flexible
// 1. Fixed Window Rate Limiting
const fixedWindowLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 1 minute
});

// 2. Sliding Window Rate Limiting
const slidingWindowLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 30, // per 30 seconds
  blockDuration: 30, // Block for 30 seconds if limit is exceeded
});

// 3. Token Bucket Rate Limiting
const tokenBucketLimiter = new RateLimiterMemory({
  points: 20, // 20 tokens
  duration: 60, // Refill tokens every minute
});

// 4. Concurrency Limiting
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5;

// Middleware for concurrency limiting
const concurrencyLimiter = (req, res, next) => {
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
    return res.status(503).send('Server busy, try again later.');
  }

  activeRequests++;

  res.on('finish', () => {
    activeRequests--;
  });

  next();
};

// Middleware to handle all rate limiters
const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await fixedWindowLimiter.consume(req.ip);
    await slidingWindowLimiter.consume(req.ip);
    await tokenBucketLimiter.consume(req.ip);
    next();
  } catch (err) {
    res.status(429).send('Too many requests - Please try again later.');
  }
};

// Apply rate limiting and concurrency limiting middleware globally
app.use(rateLimiterMiddleware);
app.use(concurrencyLimiter);

// Define routes
app.use('/payment/user', userRoutes);
app.use('/payment/services', servicesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
