import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRouter from "./routes/user-routes.js";
import measureRouter from "./routes/measure-routes.js";

dotenv.config({ path: ".env" });

// Ensure database is connected once when the module is loaded
connectDb();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/measure", measureRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true });
});

export default app;
