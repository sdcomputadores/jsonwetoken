require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const app = express()

// config json
app.use(express.json())

//models
const user = require("./models/User")


app.get('/', (req, res) => {
   res.status(200).json({msg: "Bem vindo a nossa primeira API "})
})
//registar 
app.post("/auth/register", async (req, res) =>{
 const {name, email, password, confirmpassword} = req.body

 if(!name){
    return res.status(422).json({msg: "O nome é obrigatório"})
 }
 if(!email){
    return res.status(422).json({msg: "O email é obrigatório"})
 }
 if(!password){
    return res.status(422).json({msg: "A senha é obrigatória"})
 }
 if(password != confirmpassword){
    return res.status(422).json({msg: "As senha estão diferentes, corrija por favor!"})
 }
const userExist = await user.findOne({email: email})
if(userExist){
    return res.status(422).json({msg: "Usuario ja existe"})
}

})


// credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.rnz5lfh.mongodb.net/?retryWrites=true&w=majority`,
)
.then(() =>{
    app.listen(3005)
    console.log("conectou com o banco na nuvem")
})
.catch((err) => {
    console.log(err)
})

