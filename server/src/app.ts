import express, { type Request, type Response } from "express";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import chatRouteAPI from "./api/chat/chat-route";
import userRouteAPI from "./api/user/user-route";
dotenv.config();
import * as middlewares from "./middlewares";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello,World!",
  });
});

// Chat api
app.use("/api/v1/chat", chatRouteAPI);
// User api
app.use("/api/v1/user", userRouteAPI);
// middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
