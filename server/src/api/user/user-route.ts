/**
 * This route is particularly for User API's e.g Auth, Role and Permissions
 */
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/register", (req: Request, res: Response) => {
  res.json({
    message: "Hello,from register!!!",
  });
});

export default router;
