import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import summarizeRoutes from "./src/routes/summarize.routes.js";
import { notFound } from "./src/middleware/notFound.middleware.js";
import { errorHandler } from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Website Summarizer Backend is Running" });
});

app.use("/api", summarizeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port:- ${PORT}`);
});