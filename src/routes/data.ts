import { Router } from "express";

const router = Router();

router.get("/init/:groupId", (_req, res) => {
  res.send("some text here");
});

export default router;
