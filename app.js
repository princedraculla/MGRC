import express from "express"
import dotenv from "dotenv"
import db from "./config/database.js"
dotenv.config()

const app = express()


const PORT = process.env.SERVER_PORT

app.listen(PORT, async () => {
  console.log(`app is running at http://localhost:${PORT}`)
  await db()
})