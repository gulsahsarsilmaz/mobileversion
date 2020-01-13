const express = require("express")
const AppModel = require("../models/app")

const appsRouter = express.Router()

appsRouter
    .get("/read", (req, res) => {
        AppModel.find({}, (err, apps) => {
            res.json(apps)
        })
    })
    .get("/read/:bundleId", (req, res) => {
        AppModel.findOne({ bundleId: req.params.bundleId }, (err, app) => {
            if (!app) {
                res.status(404).send({ error: "Bundle ID not found" })
                return
            }

            res.json({ buildNumber: app.buildNumber })
        })
    })
    .post("/add/", (req, res) => {
        AppModel.findOne({ bundleId: req.body.bundleId }, (err, app) => {
            if (app) {
                return res
                    .status(400)
                    .send({ error: "Bundle ID already in use" })
            }

            let buildNumber = req.body.buildNumber

            if (!Number.isInteger(buildNumber)) {
                buildNumber = parseInt(buildNumber)
            }

            if (!buildNumber) {
                buildNumber = 1
            }

            var app = new AppModel({
                bundleId: req.body.bundleId,
                appName: req.body.appName,
                buildNumber: buildNumber
            })

            app.save((err, result) => {
                if (err) {
                    return res.status(400).send({ error: err })
                }

                res.status(204).json(app)
            })
        })
    })
    .post("/set/", (req, res) => {
        AppModel.findOne({ bundleId: req.body.bundleId }, (err, app) => {
            let buildNumber = req.body.buildNumber

            if (!Number.isInteger(buildNumber)) {
                buildNumber = parseInt(buildNumber)
            }

            if (!buildNumber) {
                res.status(400).send({ error: "Invalid new build number" })
                return
            }

            if (!app) {
                if (!req.body.appName) {
                    res.status(400).send({ error: "App name is required" })
                    return
                }

                var app = new AppModel({
                    bundleId: req.body.bundleId,
                    appName: req.body.appName,
                    buildNumber: 0
                })
            }

            if (req.body.buildNumber > app.buildNumber) {
                app.buildNumber = req.body.buildNumber
                app.save((err, result) => {
                    if (err) {
                        return res.status(400).send({ error: err })
                    }

                    res.status(200).send()
                })
            } else {
                res.status(400).send({
                    error:
                        "New build number is not larger then current build number"
                })
            }
        })
    })
    .post("/bump/:bundleId", (req, res) => {
        AppModel.findOne({ bundleId: req.params.bundleId }, (err, app) => {
            if (!app) {
                var app = new AppModel({
                    bundleId: req.params.bundleId,
                    buildNumber: 0
                })
            }

            app.buildNumber++
            app.save((err, result) => {
                if (err) {
                    return res.status(400).send({ error: err })
                }

                res.json({ buildNumber: app.buildNumber })
            })
        })
    })
    .delete("/delete/:bundleId", (req, res) => {
        AppModel.findOneAndRemove(
            { bundleId: req.params.bundleId },
            (err, app) => {
                if (err) {
                    return res.status(500).send(err)
                }

                return res.status(204).send({})
            }
        )
    })

module.exports = appsRouter
