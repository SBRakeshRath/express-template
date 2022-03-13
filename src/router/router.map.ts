import express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ hello: "world" });
});

router.get("/route", (req: Request, res: Response) => {
    res.json({ hello: "route" });
  });

export default router;
