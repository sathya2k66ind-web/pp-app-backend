import express from "express";
import {
  createParking,
  getAllParkings,
  getParkingById
} from "../controllers/parkingController.js";

const router = express.Router();

router.post("/", createParking);
router.get("/", getAllParkings);
router.get("/:id", getParkingById);

export default router;
