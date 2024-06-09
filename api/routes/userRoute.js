import express from "express";
import { testfunc, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", testfunc);
router.post("/update/:id", verifyToken, updateUser);

export default router;
