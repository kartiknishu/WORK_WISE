import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getjobs", getJobs);
router.delete("/deletejob/:jobId/:userId", verifyToken, deleteJob);
router.post("/updatejob/:jobId/:userId", verifyToken, updateJob);
export default router;
