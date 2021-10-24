import express from "express";
import {index} from "../controllers/router.js";

const router = express.Router();

// INDEX
router.get("/", index);

export default router;