import mongoose from "mongoose";
import { MarkerI } from "src/markers/entities/marker.entity";
import { ModelI } from "src/models/entities/model.entity";

export class User {
  _id: mongoose.Types.ObjectId;
  name: string;
  markers: MarkerI[];
  models: ModelI[];
  isPrivate: boolean;
}
