import mongoose from "mongoose";
import { ModelI } from "../entities/model.entity";

export const ModelSchema = new mongoose.Schema<ModelI>({
  name: { type: String },
  path: { type: String },
});
