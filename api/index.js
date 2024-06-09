import express from "express";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/customErrorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

dotenv.config();

dbConnection();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log("listeninng port 3000");
});
