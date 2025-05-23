/**
 * This route is particularly for chat API's
 */
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/send", (req: Request, res: Response) => {
  res.json({
    message: "Hello,from CHAT server!!!",
  });
});

export default router;
