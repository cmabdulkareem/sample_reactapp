import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    itemName: String,
    itemDesc: String,
    itemPrice: Number,
    // other fields...
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
