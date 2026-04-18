import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  changeIdentity,
  changePassword,
  login,
  logout,
  refresh,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

router.get("/auth/refresh", refresh);

router.post("/auth/register", registerUser);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

router.put("/auth/change-identity", authMiddleware, changeIdentity);
router.put("/auth/change-password", authMiddleware, changePassword);

export default router;
