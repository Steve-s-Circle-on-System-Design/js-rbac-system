import 'reflect-metadata';
import { ROLES_KEY } from '../decorators/rolesDecorator.js';
const rolesGuard = (handler) => {
  return (req, res, next) => {
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, handler);

    if (!requiredRoles || requiredRoles.length === 0) {
      return handler(req, res, next);
    }

    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: User authentication required' });
    }

    const hasRole = requiredRoles.includes(req.user.role);
    if (!hasRole) {
      return res.status(403).json({ 
        message: `Forbidden: Requires one of [${requiredRoles.join(', ')}] role(s)` 
      });
    }

    return handler(req, res, next);
  };
};

export default rolesGuard;