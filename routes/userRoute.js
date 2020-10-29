import express from 'express';
import User from '../models/userModel.js';
import {getToken} from '../util'
const router = express.Router();
const cors = require('cors');



var whitelist = ['https://redux-ecomerce.herokuapp.com/', 'https://redux-backend.herokuapp.com/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


router.post('/login', cors(corsOptionsDelegate), async (req, res) => {
    
    const LoginQuery = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    console.log(LoginQuery);
    if(LoginQuery){
        res.send({
            id: LoginQuery.id,
            name: LoginQuery.name,
            email: LoginQuery.email,
            isAdmin: LoginQuery.isAdmin,
            token: getToken(LoginQuery)

        })
    }else{
        res.status(401).send({message: "Invalid Email and Password"})
    }


})

router.post('/register', cors(corsOptionsDelegate), async (req, res) => {
    
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
    });

    const newUser = await user.save();
    // console.log(LoginQuery);
    if(newUser){
        res.send({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)

        })
    }else{
        res.status(401).send({message: "Invalid User Information"})
    }


})





router.get("/createadmin", async (req, res) => {
    try {
        const user = new User ({
            name: 'zahid',
            email: 'zahid@gmail.com',
            password: '12345',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({message: error.message})
    }
})











export default router;