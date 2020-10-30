import jwt from 'jsonwebtoken';
import config from './config'

const getToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {expiresIn: '86400'})
}


const isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err){
                return res.status(401).send({message: "Invalid Token"})
            }
            req.user = token;
            next();
            return
        })
    }

    return res.status(401).send({message: "Token is not supplied"});
}


export {
    getToken, isLoggedIn
}