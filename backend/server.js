const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

try{
    mongoose.connect("mongodb://localhost:27017/project_test", {useNewUrlParser: true})
    console.log("Base connecté")
}
catch{
    console.log("Erreur de connexion")
}
const article = require('./routes/article.route')
const user = require('./routes/user.route')
const login = require('./routes/login.route')
const corona = require('./routes/corona.route')
app.use("/article", article)
app.use("/user", user)
app.use("/login", login)
app.use("/corona", corona)

app.listen(port, () => {
    console.log("Serveur lancé")
})