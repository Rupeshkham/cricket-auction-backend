import express from "express";
import { createTeam, getTeams } from "../controllers/teamController.js";

const router = express.Router();

router.post("/create", createTeam);
router.get("/", getTeams);

export default router;
