const router = require('express').Router()
let User = require('../models/user.model')

router.route("/").get((req,res) => {
    User.find()
        .then(users => res.json(users))
})
router.route("/add").post((req,res) => {
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password

    const newUser = new User({
        name,
        username,
        password
    })

    newUser.save()
        .then(() => res.json("Saved"))
})

router.route("/set/:id").post((req, rep) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name
            user.username =  req.body.username
            user.password = req.body.password
            user.save()
            rep.json("Updated")
        })
})

router.route("/:id").get((req, rep) => {
    User.findById(req.params.id)
        .then(user => rep.json(user))
})
module.exports = router