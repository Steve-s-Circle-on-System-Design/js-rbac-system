import Role from './role.js';
class Permissions {
    constructor() {
        this.permissions = [];
    }

    getPermissionByRoleName(roleName) {
        const role = roles.roles.find((r) => r.name === roleName);
        return role ? role.permissions : [];
    }
}

export default Permissions;