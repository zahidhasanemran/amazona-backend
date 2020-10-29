const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 
import data from './data'
import config from './config'
import userRoute from './routes/userRoute'

dotenv.config();
const mongodbUrl = config.MONGODB_URL || 'mongodb://localhost/amazona';

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json())
app.use(express.static('public'))
var corsOptions = {
    origin: "https://redux-ecomerce.herokuapp.com/"
};
  
app.use(cors(corsOptions));
app.options('*', cors())
// connectDB();




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
    let product = data.products.find(x => x.id == id);
    console.log(product);
    res.send(product);
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to express application." });
});




mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((res) => {
    console.log(res);
    app.use("/api/users", userRoute);
}).catch(error => console.log(error.message)); 
app.listen(port, () => {console.log("server started at 5000")});
