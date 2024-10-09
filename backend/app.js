//for server building 

import express from "express";
import 'dotenv/config';
import dbConnect from "./dbConnect.js";
import bookRoutes from "./Routes/bookRoutes.js";
import cors from "cors";


const app =express();
const PORT=process.env.PORT||5000;

app.use(cors());
app.get("/",(req,res)=>
{
    res.send("<h1>welcome to book store app</h1>");
});
app.use(express.json());

app.use("/api/v1/books",bookRoutes);

const start= async()=> { 
   try {
    await dbConnect(process.env.MONGO_URL);
    console.log("database connected successfully...");
     
     app.listen(PORT,()=>{
                        console.log(`server is running at port: ${PORT}`);
 
                        }
                );
}
   
   catch (error) {
    console.log("error in db connect ",error);
    
   }
};
start();
//iefe -immediate invoked function expression