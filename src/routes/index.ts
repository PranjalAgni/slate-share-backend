import { Router } from "express";
import data from "./data";
import health from "./health";

const router = Router();

router.get("/data", data);
router.get("/health", health);

export default router;
