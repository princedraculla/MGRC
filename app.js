import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
import { app } from "./Routes/index.js";
dotenv.config();


app.use(express.json());
app.use(cookieParser());


const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, async () => {
  console.log(`app is running at http://localhost:${PORT}`);
  await db();
});
