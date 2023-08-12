import express from "express"
import { getUser, login, register, updateUser } from "../controllers/profileController.js"
const route = express.Router()


//post method
route.post("/register", register)

route.post('/login', login)

//get method
route.get("/user/:email", getUser)

//put method
route.put("/update/:id", updateUser)

export default route