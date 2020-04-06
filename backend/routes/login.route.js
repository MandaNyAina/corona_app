const router = require("express").Router()
let User = require("../models/user.model")
let listUser = []
let userPass = []
let userName = []
let userId = []

router.route("/:username/:password").get((req, res) => {
    const username = req.params.username
    const password = req.params.password
    listUser = []
    userPass = []

    User.find({}, (err, users) => {
        let i = 0
        if (err) throw err
        users.forEach(user => {
            listUser.push(user.username)
            userPass[user.username] = user.password
        });
        for (let user of listUser) {
            if (username == user) {
                i=1
                if (userPass[username] == password) {
                    i=2
                }
                break
            }
            else{
                i=0
            }
        }
        if (i == 1){
            res.json("PassInvalide")
        } else if (i == 2){
            res.json("Ok")
        } else {
            res.json("CompteInvalide")
        }
        
    })
})

router.route("/:username").get((req, res) => {
    const username = req.params.username
    let name = ""
    let id = ""
    listUser = []
    userName = []
    userId = []

    User.find({}, (err, users) => {
        users.forEach(user => {
            listUser.push(user.username)
            userName[user.username] = user.name
            userId[user.username] = user._id
        });
        for (let user of listUser) {
            if (username == user) {
                name= userName[user]
                id = userId[user]
                i=1
                break
            }
            else{
                i=0
            }
        }
        if (i == 1){
            res.json({
                    "name":name,
                    "idUser":id}
            )
        } else {
            res.json("notExist")
        }
        
    })
})

module.exports = router