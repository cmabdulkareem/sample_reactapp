import mongoose from "mongoose";

const ProductSchema  = new mongoose.Schema({
    name: String,
    desc : String,
    price: Number
})

const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel;