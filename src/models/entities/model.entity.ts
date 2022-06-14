import mongoose from "mongoose";

export class ModelI {
  _id: mongoose.Types.ObjectId;
  name: string;
  path: string;
}
