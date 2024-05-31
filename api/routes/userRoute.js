import express from "express";
import { testfunc } from "../controllers/userController.js";

const router = express.Router();

router.get("/", testfunc);

export default router;
