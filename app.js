import express from "express"
import dotenv from "dotenv"
import db from "./config/database.js"
import router from "./Routes/userRoutes.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(router)



const PORT = process.env.SERVER_PORT

app.listen(PORT, async () => {
  console.log(`app is running at http://localhost:${PORT}`)
  await db()
})