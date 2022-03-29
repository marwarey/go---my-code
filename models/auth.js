const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema ({
    email:{type:String, required:true, unique:true },
    password:{type:String, required:true},
    username:{type:String},
    role:{
        type:String,
        enum:['user','agent','admin'],
        default:'user'
    }

 

    
})

module.exports=mongoose.model("User",UserSchema)