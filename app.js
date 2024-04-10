import express from "express";
import { dbConnect } from "./config/dbConnect.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import cors from "cors"

dotenv.config()
dbConnect();

const app = express();
// app.use(cors());
// // use app.cors({origin: '*'})
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

app.use(
    cors({
        credentials: true,
        origin: true,
        allowedHeaders: "*"
    })
)

app.use(express.json());

app.options('*', cors())

app.use("/api/v1/users", userRoute);


// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running at ${PORT}`))