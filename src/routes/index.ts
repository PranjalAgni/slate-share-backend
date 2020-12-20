import { Router } from "express";
import data from "./data";
import health from "./health";

const router = Router();

router.use("/data", data);
router.use("/health", health);

export default router;
