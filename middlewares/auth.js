const express = require('express');

//import JWT
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    // get token
    const token = req.header['authorization'];
    if (!token) return res.status(401).json({message: 'Unauthenticated'});

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) return res.status(401).json({message: 'Invalid token'});
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;