const express = require("express");
const AgentRoute = express.Router();
const AgentSchema = require("../models/Agent");

const {
  getAgents,
  deleteAgent,
  updateAgent,
  getOneAgent,
} = require("../controllers/Agent");

AgentRoute.post("/addAgent", async (req, res) => {
  try {
    const { name, profession, discription, phoneNum, Adress } = req.body;
    const Agent = new AgentSchema(req.body);
    console.log(Agent);
    const found = await AgentSchema.findOne({ phoneNum });
    if (found) {
      res.status(400).send("agent already exists");
    }
    await Agent.save();
    res.status(200).send({ msg: "New Agent", Agent });
  } catch (error) {
    res.status(500).send({ msg: "could not add Agent", error });
    console.log(error);
  }
});

AgentRoute.get("/", getAgents);

AgentRoute.delete("/:id", deleteAgent);

AgentRoute.put("/:id", updateAgent);

AgentRoute.get("/:id", getOneAgent);

module.exports = AgentRoute;
