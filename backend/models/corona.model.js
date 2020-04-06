const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CoronaSchema = new Schema({
    'corona_data': {
        type: Array,
        required:true
    }
},{
    timestamps: true
})

const Corona = mongoose.model("Corona", CoronaSchema)
module.exports = Corona