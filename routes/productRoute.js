import express from 'express';
import Product from '../models/productModel ';
import {getToken} from '../util'
const router = express.Router();

router.get("/", (req, res) => {
    const products = await products.find({});
    res.send(products)
})

router.post("/", async(req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        review: req.body.review,
        price: req.body.price,
        title: req.body.title,
        featured: req.body.featured,
        newS: req.body.newS,
        short_des: req.body.short_des,
        qty: req.body.qty,
        long_des: req.body.long_des,
        total: req.body.total,
        best: req.body.best,
    });

    const newProduct = await product.save();

    if(newProduct){
       return res.status(201).send({message: "New product Created.", data: newProduct})
    }
    return res.status(500).send({message: "Error in creating product"})

} )



export default router;