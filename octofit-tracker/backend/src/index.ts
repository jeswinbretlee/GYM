import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/octofit";

app.get("/", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB", MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

export default app;
