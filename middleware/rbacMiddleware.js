import Role from '../models/role.js';
import Permissions from '../models/permissions.js';

// Check if the user has the required permission for a route
export const checkPermission = (permission) => {
  return (req, res, next) => {

    if(!req.user){
      return res.status(401).json({error:"Unauthorized user."})
    }
    
    const userRole = req.user.role;
    const userPermissions = new Permissions().getPermissionByRoleName(userRole);

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }
  };
};

// Export an object containing checkPermission (matches how it's imported)
const rbacMiddleware = { checkPermission };
export default rbacMiddleware;