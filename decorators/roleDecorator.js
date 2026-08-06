import 'reflect-metadata';

const ROLES_KEY = 'roles';
const Roles = (...roles) => {
  return (handler) => {
    Reflect.defineMetadata(ROLES_KEY, roles, handler);
    return handler;
  };
};

export { Roles, ROLES_KEY };