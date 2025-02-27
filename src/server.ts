import express,{Application} from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app:Application = express();
const port =  process.env.PORT || 3000;


app.use(express.json());

app.get("/",(req,res)=>{ 
    //make console log error if not running
    if (res.status(500)) {
       res.send("HRIS API is not running...");
    }
    res.send("HRIS API is running...");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });