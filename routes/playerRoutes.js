import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  addPlayers,
  getAllPlayers,
  auctionPlayer,
} from "../controllers/playerController.js";

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
router.post("/add", upload.single("image"), addPlayers); // ☁️ Cloudinary
router.get("/", getAllPlayers);
router.post("/auction", auctionPlayer);

export default router;
