import mongoose from "mongoose";
import { MarkerSchema } from "src/markers/schema/marker.schema";
import { ModelSchema } from "src/models/schema/model.schema";
import { User } from "../entities/user.entity";
export const UserSchema = new mongoose.Schema<User>({
  models: [ModelSchema],
  markers: [MarkerSchema],
});
