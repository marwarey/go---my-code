const AgentSchema=require("../models/Agent");

exports.addAgent= async (req,res)=>{
    try {
        const{name,profession,discription,phoneNum,Adress} = req.body
        const Agent= new AgentSchema(req.body)
        const found= await AgentSchema.findOne({phoneNum})
        if(found){
            res.status(400).send('agent already exists')
        }
        await Agent.save()
        res.status(200).send({msg:"New Agent", Agent})
    } catch (error) {
        res.status(500).send({msg:"could not add Agent", error})   
        console.log(error)
    }
}







exports.getAgents= async (req, res) => {
    try {
        const Agents = await AgentSchema.find();
        res.status(200).send({msg: "your Agent list",Agents})
    } catch (error) {
        res.status(500).send({msg: "could not find Agent",error})
    }
}
exports.deleteAgent = async(req,res) => {
    try {
        const deleted=await AgentSchema.findByIdAndDelete(req.params.id)
        res.status(200).send({msg:"Agent deleted" , deleted})
    } catch (error) {
        res.status(500).send({msg:"could not delete",error})


    }
}
exports.updateAgent=async (req,res)=>{
    try {
        const updated = await AgentSchema.findByIdAndUpdate(req.params.id, {$set:req.body,
        })
        res.status(200).send({msg:"Agent updated",updated})
    } catch (error) {
        res.status(500).send ({msg:'could not up dated',error})
    }
}
exports.getOneAgent= async(req,res)=>{
    try {
        const foundAgent= await AgentSchema.findById(req.params.id)
        res.status(200).send ({msg:"Agent found",foundAgent})
    } catch (error) {
        res.status(500).send({msg:"could not found Agent",error})
    }
}
