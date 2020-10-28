import mongoose from 'mongoose';


const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    review: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    title: {type: String, required: true},
    featured: {type: String, required: true},
    newS: {type: String, required: true},
    short_des: {type: String, required: true},
    qty: {type: String, required: true},
    long_des: {type: String, required: true},
    total: {type: Number, default: 0, required: true},
    best: {type: String, required: true},
})

const productModel = mongoose.model("User", productSchema);


export default productModel;