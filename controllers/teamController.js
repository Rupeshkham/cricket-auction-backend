import Team from "../models/Team.js";
import Player from "../models/Player.js";

// Create team

// Create team
export const createTeam = async (req, res) => {
  try {
    const { name, owner, pointsLeft } = req.body;

    // Validation
    if (!name || !owner) {
      return res.status(400).json({ message: "Team name and owner are required" });
    }

    // Create new team
    const team = await Team.create({ name, owner, pointsLeft });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ➤ Update Team
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, owner, pointsLeft } = req.body;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found!" });
    }

    if (name) team.name = name;
    if (owner) team.owner = owner;
    if (pointsLeft !== undefined) team.pointsLeft = pointsLeft;

    await team.save();

    res.status(200).json({
      message: "Team updated successfully",
      team,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ➤ Delete Team
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found!" });
    }

    // Remove sold reference from players
    await Player.updateMany(
      { soldTo: team._id },
      { $set: { soldTo: null, price: 0 } }
    );

    await team.deleteOne();

    res.status(200).json({
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
