import Team from "../models/Team.js";

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
