import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    parkingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
    },

    slotNumber: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["car", "bike"],
      default: "car",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

slotSchema.index({ parkingId: 1, slotNumber: 1 }, { unique: true });

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
