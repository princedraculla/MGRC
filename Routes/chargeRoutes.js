import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { userCharge } from "../controller/charge.controller.js";
const router = express.Router()


router.post('/api/v1/charge', verifyToken, userCharge)

export  {router}