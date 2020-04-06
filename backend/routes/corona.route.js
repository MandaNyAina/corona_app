const router = require("express").Router()
const Corona = require("../models/corona.model")

router.route("/").get((req, rep) => {
    Corona.find()
        .then(response => rep.json(response))
        .catch(err => rep.json(err))
})

router.route("/").post((req, rep) => {
    const corona_data = req.body

    const newCorona = new Corona({
        corona_data
    })

    newCorona.save()
        .then(() => rep.json("Saved"))
})

router.route("/:id").post((req, rep) => {
    Corona.findById(req.params.id)
        .then(corona => {
            corona.corona_data = req.body
            corona.save()
            rep.json("Updated")
        })
})

module.exports = router