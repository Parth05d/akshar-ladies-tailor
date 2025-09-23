import mongoose from "mongoose";

const measureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    shoulder: {
      type: Number,
    },
    sleeveLength: {
      type: Number,
    },
    bust: {
      type: Number,
    },
    hip: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Measure = mongoose.model("Measure", measureSchema);

export default Measure;
