import { IUser } from 'src/domain';

declare module 'express' {
  interface Request {
    user?: Required<IUser>;
  }
}
