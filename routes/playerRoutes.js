import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  addPlayers,
  getAllPlayers,
  auctionPlayer,
  updatePlayer,
  deletePlayer,
  updateSoldPlayer,
  unsoldPlayer,
} from "../controllers/playerController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

// ☁️ Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cricket-auction-players",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => Date.now(),
  },
});

// Multer
const upload = multer({ storage });

// ➤ Routes
router.post("/add", protect, adminOnly, upload.single("image"), addPlayers);
router.put("/:id", protect, adminOnly,   upload.single("image"), updatePlayer);
router.delete("/:id", protect, adminOnly, deletePlayer);
router.get("/", getAllPlayers);
router.post("/auction", protect, adminOnly, auctionPlayer);
router.put("/update-sold/:id", protect, adminOnly, updateSoldPlayer);
router.delete("/unsold/:id", protect, adminOnly, unsoldPlayer);

export default router;
