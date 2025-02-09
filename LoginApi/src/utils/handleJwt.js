const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = (user) => {
    console.log("user:", user);
    return jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: "2h"});
};

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (err) {
        console.error("Error verificando el token JWT:", err);
        throw new Error("Token inválido"); }
};

module.exports = {tokenSign, verifyToken};
