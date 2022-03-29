const mongoose = require("mongoose")

const AgentSchema = new mongoose.Schema ({
    name:{type:String},
    profession :{type:String} ,
    discription:{type:String},
    phoneNum:{type:Number, required:true},
    Adress:{type:String}
   
})

module.exports=mongoose.model("Agent",AgentSchema)