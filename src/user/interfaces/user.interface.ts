import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  status: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly password: string;
}
