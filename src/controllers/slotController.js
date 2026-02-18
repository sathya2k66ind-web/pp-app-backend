import Slot from "../models/Slot.js";
import Parking from "../models/Parking.js";

// POST /api/slots
export const createSlot = async (req, res) => {
  try {
    const { parkingId, slotNumber, type } = req.body;

    if (!parkingId || !slotNumber) {
      return res.status(400).json({ message: "parkingId and slotNumber required" });
    }

    const parkingExists = await Parking.findById(parkingId);
    if (!parkingExists) {
      return res.status(404).json({ message: "Parking not found" });
    }

    const slotExists = await Slot.findOne({ parkingId, slotNumber });
    if (slotExists) {
      return res.status(400).json({ message: "Slot already exists" });
    }

    const slot = await Slot.create({
      parkingId,
      slotNumber,
      type: type || "car",
      isActive: true,
    });

    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/slots/:parkingId
export const getSlotsByParking = async (req, res) => {
  try {
    const slots = await Slot.find({ parkingId: req.params.parkingId }).sort({
      slotNumber: 1,
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

