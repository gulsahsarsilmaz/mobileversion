const express = require("express")
const UserModel = require("../models/user")

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
var config = require("../config")

var VerifyToken = require("./VerifyToken")

const appsRouter = express.Router()

appsRouter.post("/login", function(req, res) {
    UserModel.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send("Error on the server.")
        if (!user) return res.status(404).send("No user found.")

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid)
            return res.status(401).send({ auth: false, token: null })

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        })

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token })
    })
})

appsRouter.get("/logout", function(req, res) {
    res.status(200).send({ auth: false, token: null })
})

appsRouter.post("/register/", (req, res) => {
    if (!req.body.password) return false
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)

    UserModel.findOne({ username: req.body.username }, (err, user) => {
        if (user) {
            return res.status(400).send({
                error: "User with this username has already been created"
            })
        }

        var user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        user.save((err, result) => {
            if (err) {
                return res.status(400).send({ error: err })
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            })

            res.status(200).send({ auth: true, token: token })
        })
    })
})

appsRouter.get("/users", VerifyToken, (req, res) => {
    UserModel.find({})
        .populate("users")
        .select("_id username email")
        .exec(function(err, users) {
            res.json(users)
        })
})

appsRouter.get("/users/:username", VerifyToken, (req, res) => {
    UserModel.findOne(
        { username: req.params.username },
        { password: 0 },
        (err, user) => {
            if (!user) {
                res.status(404).send({
                    error: "User with the given credentials is not found"
                })
                return
            }
            if (err)
                return res
                    .status(500)
                    .send("There was a problem finding the user.")

            res.status(200).send(user)
        }
    )
})

module.exports = appsRouter
