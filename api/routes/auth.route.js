import { signin } from "../controllers/auth.controller.js";
import { signup } from "../controllers/auth.controller.js";
import { signout } from "../controllers/auth.controller.js";

import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/sign-out", signout);
export default router;
