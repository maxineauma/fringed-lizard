import express from "express";
import { createProject, getUserProjects, getProjects, updateProject } from "../controllers/Project.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.post("/update/:id", updateProject);
router.get("/:email", getUserProjects);

export default router;