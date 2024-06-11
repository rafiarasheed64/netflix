import express, { Router } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import database from './connection/database.js'
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import path from 'path'

database()

dotenv.config({
    path:".env"
})

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin : 'http://localhost:3000',
    Credentials: true
}
app.use(cors(corsOptions))

app.use("/api/v1/user", userRoute)

app.get('/', (req, res)=>{
    app.use(express.static(path.resolve(__dirname, "frontend", "build")))
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
})


app.listen(process.env.PORT, ()=>{
    console.log(`server running at port ${process.env.PORT}`);
})