import { SetMetadata } from '@nestjs/common';
import { UserRolesType } from 'src/domain/IUser';

export const RolesAllowed = (...roles: UserRolesType[]) =>
  SetMetadata('roles', roles);
