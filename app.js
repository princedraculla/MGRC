import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()


const PORT = process.env.SERVER_PORT

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`)
})