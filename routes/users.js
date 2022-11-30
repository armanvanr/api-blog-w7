const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User } = require("../models");
const SECRET_KEY = "Ho_Rahasia"
const jwt = require("jsonwebtoken");


//perlu implement JOI untuk validasi data sign up
//1. sign up
router.post("/signup", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "The password and confirm password must match",
        });
        return;
    }

    const existsUsers = await User.findAll({
        where: {
            [Op.or]: [{ nickname }],
        },
    });
    if (existsUsers.length) {
        res.status(400).send({
            errorMessage: "This is a duplicate nickname",
        });
        return;
    }

    await User.create({ nickname, password });
    res.status(201).send({message: "An account has been succesfully created"});
});

//2. login
router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;

    const user = await User.findOne({where:{nickname} });
    console.log("user:", user)
    if (!user || password !== user.password) {
        res.status(400).send({
            errorMessage: "Either user does not exist or password is incorrect.",
        });
        return;
    }
    const token = jwt.sign({ userId: user.userId }, SECRET_KEY);
    res.status(200).send({ token });
});

module.exports = router;