const express = require("express");

const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const prisma = require("../prisma/client");

const register = async (req, res)=>{
    //priksa hasil validasi
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //jika ada error , kembalikan ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        // return respon json
        res.status(201).send({
            success: true,
            message: "RRegister successfully",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = { register };