const router = require('express').Router()

let Article = require('../models/article.model')

router.route("/").get((req, rep) =>{
    Article.find()
        .then(articles => rep.json(articles))
})

router.route("/add").post((req, rep) => {
    const nom_article = req.body.nom_article
    const description = req.body.description
    const auteur = req.body.auteur
    const NewArticle = new Article({
        nom_article,
        description,
        auteur
    })

    NewArticle.save()
    .then(() => rep.json('Article added'))
    .catch(err => rep.status(400).json('Error: ' + err));
})

router.route("/:id").post((req,rep) => {
    Article.findById(req.params.id)
        .then(article => {
            article.commentaires = req.body
            article.save()
            rep.json("Saved")
        })
})

router.route("/edit/:id").post((req,rep) => {
    Article.findById(req.params.id)
        .then(article => {
            article.nom_article = req.body.nom_article
            article.description = req.body.description
            article.save()
            rep.json("Saved")
        })
})
router.route("/delete/:id").delete((req, res) => {
    Article.findByIdAndDelete(req.params.id)
        .then(res.json("Success"))
})
router.route("/:id").get((req, res) => {
    Article.findById(req.params.id)
        .then(article => res.json(article))
})

module.exports= router