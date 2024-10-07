import mongoose, { Document, Model } from "mongoose";

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
    visits: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export interface IURL extends Document {
  originalUrl: string;
  shortUrl: string;
  visits: number;
}

const URL: Model<IURL> =
  mongoose.models.URL || mongoose.model<IURL>("URL", urlSchema);

export default URL;
