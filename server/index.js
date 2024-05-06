import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import UserModel from './models/users.js';
import session from 'express-session'
import cookieParser from 'cookie-parser';


const app = express();
const port = 3000;

app.use(cors({
    origin: [''],
    methods: ["POST", "GET"], // Adjust the port to match your React app's port
    credentials: true
}));

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

mongoose.connect("mongodb://localhost:27017/react")


app.get('/', (req,res)=>{
    if(req.session.name){
        console.log(req.session.name)
        res.json({Valid: true, username: req.session.name})
    }else{
        res.json({Valid: false})
    }
})


app.post('/register', (req,res)=>{
    UserModel.create(req.body)
        .then((user)=>{ res.json(user)})
        .catch((error)=>{res.json(error)})
})

app.post("/login", (req, res) => {
    // Destructuring email and password from req.body
    const { email, password } = req.body;
 
    // Using findOne to fetch single user
    UserModel.findOne({ email: email })
    .then((user) => {
        if (user) { // Check if user object exists
            if (user.password === password) {
                req.session.name = user.name
                console.log(req.session.name)
                res.json({Login: true});
            } else {
                res.json("password incorrect");
            }
        } else {
            res.json("no email found");
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    });
 });
 

    app.listen(port, ()=>{
        console.log("server running")
    })
