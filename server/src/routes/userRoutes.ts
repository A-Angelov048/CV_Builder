import express from "express";
import {
  login,
  logout,
  refresh,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/refresh", refresh);

export default router;
