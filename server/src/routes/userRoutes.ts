import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  changeIdentity,
  changePassword,
  login,
  logout,
  refresh,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";

const router = express.Router();

router.get("/auth/refresh", refresh);

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

router.put("/auth/change-identity", authMiddleware, changeIdentity);
router.put("/auth/change-password", authMiddleware, changePassword);

export default router;
