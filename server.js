import express from 'express';
import userRoute from './routes/userRoute'
import data from './data'
import config from './config'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

dotenv.config();
const mongodbUrl = config.MONGODB_URL;

const port = process.env.PORT || 5000;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    app.use("/api/users", userRoute);
    
})
.catch(error => console.log(error.message))


const app = express();
app.use(bodyParser.json())
// app.use("/api/users", userRoute);
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
    // console.log(id);
    let product = data.products.find(x => x.id == id);
    console.log(product);
    res.send(product);
});


app.get("/", (req, res) => {
    res.json({ message: "Welcome to express application." });
  });


app.listen(port, () => {console.log("server started at 5000");});
app.use(express.static('public'));

