import mongoose from 'mongoose';
import { User } from '../entities/user.entity';
export const UserSchema = new mongoose.Schema<User>({
  markers: [
    {
      name: { type: String },
      patternPath: { type: String },
      imagePath: { type: String },
      timestamp: { type: Number },
    },
  ],
});
