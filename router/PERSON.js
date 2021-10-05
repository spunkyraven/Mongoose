console.clear();
const mongoose = require("mongoose");
const express = require("express");
const person = require("../models/person");
const router = express.Router();

//router.get("/", (req, res) => {
// res.send("send");
//});
//////////////////////////////////////////////

router.get("/y", async (req, res) => {
  try {
    // step1 : i get the data from the database
    // Contact== ya collection contacts ija
    const allContacts = await person.find({});
    //   step2: theni send it
    res.send({ msg: "get all contacts", person: allContacts });
  } catch (error) {
    res.status(400).send({ msg: "can not get all contacts" });
  }
});

/////////////////////////////////////////////
router.post("/", async (req, res) => {
  // const newContact= req.body;
  try {
    const newPerson = new person({ ...req.body });
    await newPerson.save();
    res.send({ msg: "add route", newPerson });
  } catch (error) {
    res.status(400).send({ msg: "user not saved", error });
  }
});
////////////////////////////////////////////////

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const findperson = await person.findOne({ _id });
    res.send({ msg: "get the contact", findperson });
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
});

///////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const { name } = req.body;
    const findperson = await person.findOne({ name });
    res.send({ msg: "get the contact", findperson });
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
});

///////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const { favoriteFoods } = { ...req.body, req };
    const findperson = await person.findOne({ favoriteFoods });
    res.send({ msg: "get the contact", findFood });
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
});

/////////////////////////////////////////////////////

router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(req.body);
    let findPerson = await person.findById(_id);
    findPerson.favoriteFoods.push(req.body.favoriteFoods);
    await findPerson.save();
    res.send("done");
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
});
/////////////////////////////////////////////////////////
router.get("/food", async (req, res) => {
  try {
    const { favoriteFoods } = req.body;
    console.log(favoriteFoods);
    const findperson = await Person.findOne({
      favoriteFoods: { $in: [favoriteFoods] },
    });
    res.send({ msg: "get the contact", findperson });
    // res.send("ok")
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
});
/////////////////////////////////////////////////////////////

module.exports = router;