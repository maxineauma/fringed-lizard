import express from "express";
import {
  getUserTimers,
  createTimer,
  deleteTimer,
} from "../controllers/Timer.js";

const router = express.Router();

router.get("/:email", getUserTimers);
router.post("/", createTimer);
router.delete("/:id", deleteTimer);

export default router;