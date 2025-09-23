import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  getUser,
} from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

//REGISTER ROUTES
router.post("/register", createUser);

//LOGIN ROUTES
router.post("/login", loginUser);

//UPDATE ROUTES
router.put("/", authMiddleware, updateUser);
router.get("/", authMiddleware, getUser);

export default router;
