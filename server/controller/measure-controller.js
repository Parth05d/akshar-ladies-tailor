import Measure from "../models/measurement-model.js";

// Create new measurement (only for logged-in user)
export const createMeasure = async (req, res) => {
  try {
    const newMeasure = new Measure({
      ...req.body,
      user: req.user._id, // attach logged-in user
    });

    await newMeasure.save();
    res.status(201).json({
      message: "Measurement created successfully",
      data: newMeasure,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating measurement", error: error.message });
  }
};

// Get all measurements for the logged-in user (with optional search)
export const getMeasures = async (req, res) => {
  const { search } = req.query;

  try {
    let query = { user: req.user._id }; // filter by logged-in user

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    const measures = await Measure.find(query);
    res.status(200).json(measures);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting measures", error: error.message });
  }
};

// Get a single measurement (only if it belongs to user)
export const getMeasuresById = async (req, res) => {
  try {
    const measure = await Measure.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!measure) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json(measure);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting measure by id", error: error.message });
  }
};

// Update a measurement (only if it belongs to user)
export const updateMeasureById = async (req, res) => {
  try {
    const updatedMeasure = await Measure.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedMeasure) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({
      message: "Measurement updated successfully",
      data: updatedMeasure,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating measure", error: error.message });
  }
};

// Delete a measurement (only if it belongs to user)
export const deleteMeasureById = async (req, res) => {
  try {
    const deletedMeasure = await Measure.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedMeasure) {
      return res.status(404).json({ message: "Measurement not found" });
    }

    res.status(200).json({
      message: "Measurement deleted successfully",
      data: deletedMeasure,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting measure", error: error.message });
  }
};
