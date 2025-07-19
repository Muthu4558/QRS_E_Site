// models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Electronics', 'Clothing', 'Accessories'], required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  description: { type: String, required: true },
  stock: { type: Number, default: 0 },
  brand: { type: String, default: "N/A" },
  image: { type: String },
  featured: { type: Boolean, default: false } // NEW
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;