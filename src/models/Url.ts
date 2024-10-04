import mongoose, { Document, Schema, Model } from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export interface IURL extends Document {
  originalUrl: string;
  shortUrl: string;
}

const URL: Model<IURL> =
  mongoose.models.URL || mongoose.model<IURL>("URL", urlSchema);

export default URL;
