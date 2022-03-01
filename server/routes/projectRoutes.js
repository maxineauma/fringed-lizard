import express from "express";
import {
  createProject,
  getUserProjects,
  getProjects,
  updateProject,
} from "../controllers/Project.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:email", getUserProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);

export default router;