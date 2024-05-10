import express from "express"
import  {login, register, userList}  from "../controller/user.controller.js"
import verifyToken from "../middleware/authMiddleware.js" 
import inputValidation from "../middleware/validation.js"


const route = express.Router()

route.post('/api/v1/register', inputValidation, register)
route.post('/api/v1/login', login)
route.get('/api/test/list', userList)


export  {route}