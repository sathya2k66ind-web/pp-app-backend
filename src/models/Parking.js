import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    totalSlots: { type: Number, required: true },
  },
  { timestamps: true }
);

const Parking = mongoose.model("Parking", parkingSchema);

export default Parking;

