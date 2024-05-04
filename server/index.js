import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import UserModel from './models/users.js';


const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static('public/images'))

mongoose.connect("mongodb://localhost:27017/react")


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
                res.json("success");
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
