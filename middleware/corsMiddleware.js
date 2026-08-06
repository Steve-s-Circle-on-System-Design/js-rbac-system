import express from 'express';
import cors from 'cors';

const allowedOrigins = process.env.allowedOrigins ? JSON.parse(process.env.allowedOrigins) : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isWhitelisted = allowedOrigins.includes(origin);
    const isDynamicSubdomain = /^https:\/\/[a-z0-9-]+\.staging\.myapp\.com$/.test(origin);

    if (isWhitelisted || isDynamicSubdomain) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy restriction: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400,
};

export default cors(corsOptions);