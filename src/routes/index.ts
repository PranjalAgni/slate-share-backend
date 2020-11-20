import { Router } from "express";
import data from "./data";

const router = Router();

router.get("/data", data);

export default router;
