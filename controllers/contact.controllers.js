const Contact = require("../models/person");

exports.getAllContact = async (req, res) => {
  try {
    const contactslist = await Contact.find();

    res.send({ contactslist, msg: "get all contact" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "can not get", error });
  }
};

exports.addContact = async (req, res) => {
  try {
    const findUser = await Contact.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).send({ msg: "email should be unique" });
    }

    const newContact = new Contact({ ...req.body });
    await newContact.save();

    res.send({ msg: "add route", newContact });
  } catch (error) {
    res.status(400).send({ msg: "user not saved", error });
  }
};

exports.getContact = async (req, res) => {
  try {
    const { _id } = req.params;
    const findContact = await Contact.findOne({ _id });
    res.send({ msg: "get the contact", findContact });
  } catch (error) {
    res.status(400).send({ msg: "can not get the contact" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    let result = await Contact.deleteOne({ _id: id });
    res.send({ msg: "deleted succ" });
  } catch (error) {
    res.status(400).send({ msg: "can not delete" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.updateOne({ _id: id }, { $set: { ...req.body } });
    res.send({ msg: "updated succ" });
  } catch (error) {
    res.status(400).send({ msg: "can not update" });
  }
};
