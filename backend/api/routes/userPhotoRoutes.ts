import express from "express";
import cors from "cors";
import { updateUserPhoto } from "../controllers/userPhotoController";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", updateUserPhoto);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
