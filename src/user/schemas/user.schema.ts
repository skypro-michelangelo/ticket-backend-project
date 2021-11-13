import * as mongoose from 'mongoose';
import { statusEnum } from '../enums/status.enum';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(statusEnum),
    default: statusEnum.pending,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.index({ email: 1 }, { unique: true });
