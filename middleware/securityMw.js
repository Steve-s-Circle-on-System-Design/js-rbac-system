import helmet from 'helmet';

const securityMiddleware = helmet({
  // CLICKJACKING DEFENSE
  frameguard: {
    action: 'deny',
  },
  // CONTENT SECURITY POLICY
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
    },
  },

  noSniff: true,
});

export default securityMiddleware;