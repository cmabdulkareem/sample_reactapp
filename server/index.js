import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import UserModel from "./models/users.js";
import ProductModel from "./models/products.js";
import session from 'express-session';
import cookieParser from 'cookie-parser'
import fileUpload from "express-fileupload";
import path from 'path'

const app = express()
const port = 3000;

app.use(fileUpload())
app.use('/images', express.static('public/images'))
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

mongoose.connect("mongodb://localhost:27017/reactsampledb")



app.get('/', (req, res) => {
    if (req.session.name) {
        res.json({ Valid: true, username: req.session.name })
    } else {
        res.json({ Valid: false })
    }
})


app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then((user) => { res.json(user) })
        .catch((errr) => { res.json(error) })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                if (user.password === password) {
                    req.session.name = user.name;
                    console.log(req.session.name)
                    res.json({ Login: true })
                } else {
                    res.json("password incorrect")
                }
            } else {
                res.json("user not found")
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

//Add Produtct post request
app.post('/api/add_product', (req, res) => {
    ProductModel.create(req.body)
        .then((product) => {
            let image = req.files.image;
            image.mv(path.join('./public/images/product-images', `${product._id}.jpg`))
            res.json(product) })
        .catch((error) => { res.json(error) })
})

//View Produtct get request
app.get('/api/view_product', (req, res) => {
    ProductModel.find({}).lean()
    .then((products)=>{
        res.json(products)
    })
})


// Route to handle deletion of products
app.delete('/api/delete-product/:id', (req, res) => {
    const productId = req.params.id;

    ProductModel.findByIdAndDelete(productId)
        .then(() => {
            console.log("Product deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting product:", error);
        });
});

// Route to handle editing of products
app.get('/api/edit-product/:id', (req, res) => {
    const productId = req.params.id;

    ProductModel.findById(productId)
        .then((product) => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch((error) => {
            console.error("Error retrieving product:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});



app.listen(port, () => {
    console.log("server running")
})