require("dotenv").config();
const { User } = require('../../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AUTH_ROUNDS, AUTH_SECRET, AUTH_EXPIRES
  } = process.env;

// Sign Up
const signUp = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        })
        if (user) {
            return res.status(200).json({ msg: "Email registered" })
        }
        let passwordEncrypted = bcrypt.hashSync(req.body.password, Number.parseInt(AUTH_ROUNDS)); //Encrypt pass
        await User.create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email.trim().toLowerCase(),
            password: passwordEncrypted,
        })
        .then(user => {
            let token = jwt.sign({ user: user }, AUTH_SECRET, {
                expiresIn: AUTH_EXPIRES
            });
            res.json({
                token: token
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

// Login:
const signIn = async (req, res) => {
    let {email, password} = req.body;

    await User.findOne({
        where: {email: email}
    })
    .then(user => {
        if(!user){
            res.status(200).json({msg: "Email not found"})
        }
        else{
            if(bcrypt.compareSync(password, user.password)){
                let token = jwt.sign({user: user}, AUTH_SECRET, {
                    expiresIn: AUTH_EXPIRES
                });
                res.json({
                    token: token
                })
            }
            else{
                //Msg unauthorized
                res.status(401).json({msg: "Incorrect password"})
            }
        }
    })

};

module.exports = {
    signIn, signUp
}