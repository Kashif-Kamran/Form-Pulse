import { IUser } from 'src/domain/IUser';

declare module 'express' {
  interface Request {
    user?: Required<IUser>;
  }
}
