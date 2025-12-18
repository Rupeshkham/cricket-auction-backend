import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    owner: { type: String, required: true }, // ❗ required field
    pointsLeft: { type: Number, default: 100 },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  },
  { timestamps: true }
);


export default mongoose.model("Team", teamSchema);
