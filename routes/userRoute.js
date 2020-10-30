import express from 'express';
import User from '../models/userModel.js';
import {getToken} from '../util'
const router = express.Router();


router.post('/login', async (req, res) => {
    
    const LoginQuery = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    // console.log(LoginQuery);
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

router.post('/register', async (req, res) => {
    
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