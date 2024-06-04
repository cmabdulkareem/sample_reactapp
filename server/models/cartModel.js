import mongoose from "mongoose";

// Subdocument schema for the products in the cart
const cartProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
});

// The main cart schema
const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [cartProductSchema]  // Use the subdocument schema here
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
