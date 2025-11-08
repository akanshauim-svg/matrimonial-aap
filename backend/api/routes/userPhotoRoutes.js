import express from "express";
import cors from "cors";
import userPhotoRoutes from "./api/routes/userPhotoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userPhotoRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
