const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const config = require('../config');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync(path.resolve(__dirname, "../config/keys/private.key"), 'utf8');
const publicKEY = fs.readFileSync(path.resolve(__dirname, "../config/keys/public.key"), 'utf8');

const defaultOptions = {
    issuer: config.jwtOptions.issuer,
    audience: config.jwtOptions.audience,
    expiresIn: `${config.jwtOptions.expiresInHours}h`,
    algorithm: "RS256"
}

module.exports = {
    createToken: (payload) => new Promise((resolve, reject) => {
        jwt.sign(payload, privateKEY, defaultOptions, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    }),
    verify: (token) => new Promise((resolve, reject) => {
        const verifyOptions = {...defaultOptions};
        verifyOptions.algorithms = [defaultOptions.algorithm];

        jwt.verify(token, publicKEY, verifyOptions, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    })
}