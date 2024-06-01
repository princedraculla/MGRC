import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { userCharge, userUpload } from "../controller/charge.controller.js";
import upload from "../middleware/fileHandler.js";
const router = express.Router()


router.post('/api/v1/charge', verifyToken, userCharge)
router.post('/api/v1/upload', verifyToken ,upload.single('file'), userUpload)

export  {router}