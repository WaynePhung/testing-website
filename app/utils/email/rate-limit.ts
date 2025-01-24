import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests sent, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const applyRateLimit = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<void>((resolve, reject) => {
    limiter(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
