import express from "express";
import { createProject, deleteProject, getUserProjects } from "../controllers/Project.js";

const router = express.Router();

router.post("/", createProject);
router.delete("/:name", deleteProject);
router.get("/:email", getUserProjects);

export default router;