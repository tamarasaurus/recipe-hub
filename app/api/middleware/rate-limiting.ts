import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redisClient = redis.createClient(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 20,
  duration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

export default rateLimiterMiddleware;
