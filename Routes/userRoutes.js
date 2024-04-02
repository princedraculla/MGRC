import express from "express"
import  {login, register, userList}  from "../controller/user.controller.js"
import verifyToken from "../middleware/authMiddleware.js" 


const router = express.Router()

router.post('/api/v1/register', register)
router.post('/api/v1/login', login)
router.get('/api/test/list',verifyToken, userList)


export default router