
import { SetMetadata } from '@nestjs/common';
import { Role } from './enums/role';

export const ROLES_KEY = 'admin';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);