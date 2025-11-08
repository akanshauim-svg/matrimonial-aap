import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./api/routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Express server is running successfully!");
});

app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/auth", authRoutes);
// Set the port (default 5000)
const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
