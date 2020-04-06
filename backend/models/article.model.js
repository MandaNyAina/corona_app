const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    'nom_article' : {
        type:String,
        required: true
    },
    'description' : {
        type:String,
        required: true
    },
    'auteur' : {
        type:String,
        required: true
    },
    'commentaires' : {
        type:Array,
        required:false
    }
},{
    timestamps: true
})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article