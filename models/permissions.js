class Permissions {
    constuctor() {
        this.permissions = [];
    }
    getPermissionByRoleName(roleName) {
        const role = roles.roles.find((r) => r.name === roleName);
        return role ? role.permissions : [];
    }
}

module.export = Permissions;