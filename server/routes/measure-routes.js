import express from "express";
import {
  createMeasure,
  deleteMeasureById,
  getMeasures,
  getMeasuresById,
  updateMeasureById,
} from "../controller/measure-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/add-measure", authMiddleware, createMeasure);
router.get("/", authMiddleware, getMeasures);
router.get("/:id", authMiddleware, getMeasuresById);
router.put("/edit-measure/:id", authMiddleware, updateMeasureById);
router.delete("/delete-measure/:id", authMiddleware, deleteMeasureById);

export default router;
