import Role from '../models/role'
import Permission from '../models/permissions'

// Check if the user has the required permission for a route
exports.checkPermission = (permission) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : 'anonymous';
        const userPermissions = new Permissions().getPermissionByRoleName(userRole);

        if (userPermissions.includes(permission)) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' })
        }
    }
};