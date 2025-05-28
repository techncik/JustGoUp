import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
