const mongoose = require("mongoose")

const Schema = mongoose.Schema

const appModel = new Schema({
    bundleId: { type: String },
    appName: { type: String },
    buildNumber: { type: Number }
})

module.exports = mongoose.model("apps", appModel)
