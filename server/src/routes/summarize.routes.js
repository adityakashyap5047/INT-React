import express from "express";
import { summarizeUrlController } from "../controller/summarize.controller.js";

const router = express.Router();

router.post("/summarize", summarizeUrlController);

export default router;