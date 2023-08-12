import express from "express"
const app = express()
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import routeReq  from "./router/routes.js"

dotenv.config()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//api routes
app.use("/api", routeReq)

//mongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

//server
app.listen(process.env.port, ()=>{
    connect();
    console.log("Server is connected")
})