import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";
import Parking from "../models/Parking.js";

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const { parkingId, slotId, startTime, endTime } = req.body;

    if (!parkingId || !slotId || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    // validate parking
    const parking = await Parking.findById(parkingId);
    if (!parking) return res.status(404).json({ message: "Parking not found" });

    // validate slot
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    // overlap check
    const overlap = await Booking.findOne({
      slotId,
      status: "active",
      $or: [
        {
          startTime: { $lt: new Date(endTime) },
          endTime: { $gt: new Date(startTime) },
        },
      ],
    });

    if (overlap) {
      return res.status(400).json({ message: "Slot already booked for this time" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      parkingId,
      slotId,
      startTime,
      endTime,
      status: "active",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("parkingId", "name city address")
      .populate("slotId", "slotNumber type")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not allowed" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

