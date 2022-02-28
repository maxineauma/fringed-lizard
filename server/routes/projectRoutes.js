import express from "express";
import { createProject, getUserProjects } from "../controllers/Project.js";

const router = express.Router();

router.post("/", createProject);
router.get("/:email", getUserProjects);

export default router;