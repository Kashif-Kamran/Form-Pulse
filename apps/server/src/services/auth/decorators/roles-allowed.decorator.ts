import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@repo/shared';

export const RolesAllowed = (...roles: RoleType[]) =>
  SetMetadata('roles', roles);
