import express from "express";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";

const app = express();

dotenv.config();

dbConnection();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("listeninng port 3000");
});
