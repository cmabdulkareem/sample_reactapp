import express from 'express';
const router = express.Router();
import UserModel from '../models/userModel.js';
import CartModel from '../models/cartModel.js';
import ProductModel from '../models/productModel.js';

router.get('/', (req, res) => {
    if (req.session.name) {
        res.json({ Valid: true, username: req.session.name, isAdmin: req.session.isAdmin, cartQty: req.session.cartQty})
    } else {
        res.json({ Valid: false })
    }
})

router.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then((user) => { res.json(user) })
        .catch((error) => { res.json(error) })
})

router.post("/login", (req, res) => {
    // Destructuring email and password from req.body
    const { email, password } = req.body;

    // Using findOne to fetch single user
    UserModel.findOne({ email: email })
        .then((user) => {
            if (user) { // Check if user object exists
                if (user.password === password) {
                    req.session.name = user.name
                    req.session.isAdmin = user.admin;
                    req.session.userId = user._id;
                            res.json({
                                Login: true,
                            });
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

// Logout get request
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session", err);
            res.status(500).send("Internal server error");
        } else {
            console.log("Session destroyed successfully");
            res.json("logoutsuccess");
        }
    });
});

export default router;