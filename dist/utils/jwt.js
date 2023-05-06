"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const createToken = (username) => {
    const payload = {
        username,
    };
    const token = (0, jsonwebtoken_1.sign)(payload, secretKey, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
const validateToken = (token) => {
    try {
        const isValid = (0, jsonwebtoken_1.verify)(token, secretKey);
        return isValid ? true : false;
    }
    catch (err) {
        console.log("error in validating token", err);
        return false;
    }
};
exports.validateToken = validateToken;
