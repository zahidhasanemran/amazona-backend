import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User ({
            name: 'Emran',
            email: 'emran@gmail.com',
            password: '12345',
            isAdmin: true
        });
    
        const newUser = await user.save();
        // const getUser = newUser.find();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message})
    }
})


// router.get("/users", async (req, res) => {
//     const users = await User.find();
//     res.send(users)
// });

export default router;