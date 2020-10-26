import express from 'express';
import data from './data'
import config from './config'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/userRoute.js'


dotenv.config();

const mongodbUrl = config.MONGODB_URL;

// console.log(mongodbUrl);
const app = express();






app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get("/api/products", (req, res) => {
    res.send(data.products);
});


app.get("/api/products/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    let product = data.products.find(x => x.id == id);
    console.log(product);
    res.send(product);
});






mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    app.use("/api/users", routes);
    
}).catch(error => console.log(error.message))

app.listen(5000, () => {console.log("server started at 5000");});

// app.use(express.static('public'));
