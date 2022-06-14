import mongoose from "mongoose";

export class MarkerI {
  _id: mongoose.Types.ObjectId;
  name: string;
  patternPath: string;
  imagePath: string;
  timestamp: number;
}
