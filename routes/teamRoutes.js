import express from "express";
import { createTeam, deleteTeam, getTeams, updateTeam } from "../controllers/teamController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/create", protect, adminOnly, createTeam);
router.put("/:id", protect, adminOnly, updateTeam);
router.delete("/:id", protect, adminOnly, deleteTeam);
export default router;
