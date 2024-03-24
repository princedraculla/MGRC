import express from "express"
import  {login, register, userList}  from "../controller/user.controller.js"
const router = express.Router()

router.post('/api/v1/register', register)
router.post('/api/v1/login', login)
router.get('/api/test/list', userList)


export default router