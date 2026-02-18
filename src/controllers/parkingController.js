import Parking from "../models/Parking.js";

// POST /api/parking
export const createParking = async (req, res) => {
  try {
    const { name, address, city, totalSlots } = req.body;

    if (!name || !address || !city || !totalSlots) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parking = await Parking.create({
      name,
      address,
      city,
      totalSlots,
    });

    res.status(201).json(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/parking
export const getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find().sort({ createdAt: -1 });
    res.json(parkings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/parking/:id
export const getParkingById = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    res.json(parking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

