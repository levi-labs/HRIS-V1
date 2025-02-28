import express,{Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app:Application = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api",router);


app.use(errorHandler);

export default app;