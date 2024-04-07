import express from "express"
import  {login, register, userList}  from "../controller/user.controller.js"
import verifyToken from "../middleware/authMiddleware.js" 


const route = express.Router()

route.post('/api/v1/register', register)
route.post('/api/v1/login', login)
route.get('/api/test/list',verifyToken, userList)


export  {route}