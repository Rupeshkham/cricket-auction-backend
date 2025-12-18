import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // image file path
    basePoints: { type: Number, default: 3 }, // minimum 3
    role: {
      type: String,
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
      required: true,
    },
    soldTo: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Player", playerSchema);
