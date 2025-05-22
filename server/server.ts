import express from "express";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello,World!",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
