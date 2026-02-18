import express from "express";
import {
  createSlot,
  getSlotsByParking
} from "../controllers/slotController.js";

const router = express.Router();

router.post("/", createSlot);
router.get("/:parkingId", getSlotsByParking);

export default router;
