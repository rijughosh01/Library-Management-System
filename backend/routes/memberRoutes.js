const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// Create a new member
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .send({ error: "Name, email, and phone are required" });
  }

  try {
    const member = new Member({ name, email, phone });
    await member.save();
    res.status(201).send(member);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).send(members);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a member by ID
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).send({ error: "Member not found" });
    }
    res.status(200).send({ message: "Member deleted successfully", member });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
