const express= require("express")
const UserSchema=require('../models/auth')
const authRoute=express.Router()
const bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken")
const { RegisterValidation, Validator } = require("../middlewares/Validation")
const isAuth = require("../middlewares/isAuth")

authRoute.post('/SignUp',RegisterValidation,Validator  ,async (req,res)=>{
    const {email,password}=req.body
    try {
        const user = new UserSchema(req.body)
        
        const found = await UserSchema.findOne({email})
        if (found) {return res.status(400).send('user already exists')}
        const salt=10
        const hashedpassword=bcrypt.hashSync(password, salt)
        user.password=hashedpassword
        const payload ={_id: user._id}
        const token = jwt.sign(payload,process.env.SecretOrKey)
        await user.save()
        res.status(200).send({msg:"register successed",user,token})

    } catch (error) {
        res.status(500).send({ errors:[{msg:'could not register'}],error})
        
    }
})
authRoute.post('/signIn', async (req,res)=>{
    const {email,password}=req.body
    try{
        const user =await UserSchema.findOne({email})
        if (!user){return res.status(400).send({errors:[{msg:"bad credentials"}]}) }
        const match = bcrypt.compareSync(password, user.password)
        if (!match) {return res.status(400).send({errors:[{msg:"bad credentials"}]})}

        const payload ={_id:user._id}
        const token =jwt.sign(payload, process.env.SecretOrKey)
        res.status(200).send({msg:"login successed",user,token})



    }catch (error){
        res.status(500).send({ errors:[{msg:'could not login'}],error})


    }
    
})




authRoute.get('/me',isAuth,(req,res)=> res.send(req.user))

module.exports= authRoute