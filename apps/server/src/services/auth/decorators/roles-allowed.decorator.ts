import { SetMetadata } from '@nestjs/common';
import { UserRolesType } from 'src/domain';

export const RolesAllowed = (...roles: UserRolesType[]) =>
  SetMetadata('roles', roles);
