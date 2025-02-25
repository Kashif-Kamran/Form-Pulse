import { IUser } from '@repo/shared';

declare module 'express' {
  interface Request {
    user?: Required<IUser>;
  }
}
