import Player from "../models/Player.js";
import Team from "../models/Team.js";

// ➤ Add single player
import cloudinary from "../config/cloudinary.js";

export const addPlayers = async (req, res) => {
  try {
    const { name, role, basePoints } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "players",
    });

    const player = await Player.create({
      name,
      role,
      basePoints,
      image: result.secure_url, // ✅ CLOUDINARY URL
    });

    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ➤ Get all players
export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("soldTo");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ➤ Auction player update
export const auctionPlayer = async (req, res) => {
  try {
    const { playerId, teamId, price } = req.body;

    // Validate input
    if (!playerId || !teamId || !price) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Find player and team
    const player = await Player.findById(playerId);
    const team = await Team.findById(teamId);

    if (!player) return res.status(404).json({ message: "Player not found!" });
    if (!team) return res.status(404).json({ message: "Team not found!" });

    // Prevent selling already sold player
    if (player.soldTo) {
      return res.status(400).json({ message: "Player already sold!" });
    }

    // Check team has enough points
    if (team.pointsLeft < price) {
      return res
        .status(400)
        .json({ message: "Not enough points left in the team!" });
    }

    // Update player info
    player.soldTo = team._id;
    player.price = price;
    await player.save();

    // Deduct points and update team
    team.pointsLeft -= price;
    team.players.push(player._id);
    await team.save();

    // Re-fetch populated player for frontend clarity
    const updatedPlayer = await Player.findById(player._id).populate("soldTo", "name owner pointsLeft");

    res.status(200).json({
      message: `${player.name} sold to ${team.name} for ${price} points!`,
      player: updatedPlayer,
      updatedTeam: team,
    });
  } catch (error) {
    console.error("Auction Error:", error);
    res.status(500).json({ message: "Auction failed!", error: error.message });
  }
};