import Role from './role.js';
class Permissions {
    constructor() {
        this.permissions = [];
    }

    getPermissionByRoleName(roleName) {
        const roles = new Role();
        const role = roles.roles.find((r) => r.name === roleName);
        return role ? role.permission : [];
    }
}

export default Permissions;