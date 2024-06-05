import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import './config/connection.js';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
dotenv.config()


const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(fileUpload())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized : false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use('/images', express.static('public/images'))

app.use('/api',userRouter)
app.use('/api',productRouter)


    app.listen(process.env.PORT || 3000, ()=>{
        console.log("server running")
    })


