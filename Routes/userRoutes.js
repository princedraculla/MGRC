import express from "express"
import  {register, userList}  from "../controller/user.controller.js"
const router = express.Router()

router.post('/api/v1/register', register)
router.get('/api/test/list', userList)


export default router