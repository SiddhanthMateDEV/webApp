// console.log("server is running nodemon")

import express  from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


console.log(process.env.MONGO_URI);

app.use(express.json()); //to parse application/json
app.use(express.urlencoded({ extended: true }));//to parse form data { urlencoded }
app.use(cookieParser()); // parse req cookies 

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    connectMongoDB();
});