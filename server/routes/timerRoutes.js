import express from "express";
import { getUserTimers, createTimer, deleteTimer } from "../controllers/Timer.js";

const router = express.Router();

router.post("/", createTimer);
router.delete("/update/:id", deleteTimer);
router.get("/:email", getUserTimers);

export default router;