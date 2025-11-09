import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./api/routes/authRoutes";

import browseProfileRoutes from "./api/routes/browseProfileRoutes";
import storyRoutes from "./api/routes/storyRoutes";
import userRoutes from "./api/routes/userRoutes";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running successfully!");
});

app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/browse-profile", browseProfileRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stories", storyRoutes);

const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
