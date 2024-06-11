import express from "express";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import errorMiddleware from "./middlewares/customErrorMiddleware.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

dotenv.config();
dbConnection();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listeninng port 3000");
});
