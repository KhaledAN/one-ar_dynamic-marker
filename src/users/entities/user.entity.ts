import mongoose from 'mongoose';

export class User {
  _id: mongoose.Types.ObjectId;
  markers: {
    name: string;
    patternPath: string;
    imagePath: string;
    timestamp: number;
  }[];
}
