import express from "express";
import {
  signup,
  login,
  getUsers,
  getUserNameById,
  getUserEmailById,
  getUserRoleById,
} from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id/name", getUserNameById);
router.get("/:id/email", getUserEmailById);
router.get("/:id/role", getUserRoleById);

router.post("/signup", signup);
router.post("/login", login);

export default router;