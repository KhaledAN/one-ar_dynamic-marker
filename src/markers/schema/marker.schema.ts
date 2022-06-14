import mongoose from "mongoose";

export const MarkerSchema = new mongoose.Schema({
  name: { type: String },
  patternPath: { type: String },
  imagePath: { type: String },
  timestamp: { type: Number },
});
