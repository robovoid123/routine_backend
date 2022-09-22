const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(3).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string(),
});

//SIGNUP USER
const userRegister = async (req, res) => {
  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION

    //   IF ERROR EXISTS THEN SEND BACK THE ERROR
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      //CHECKING IF USER EMAIL ALREADY EXISTS
      const emailExist = await User.findOne({ email: req.body.email });
      // IF EMAIL EXIST THEN RETURN
      if (emailExist) {
        res.status(400).send("Email already exists");
        return;
      }

      //HASHING THE PASSWORD

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //ON PROCESS OF ADDING NEW USER

      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });

      //NEW USER IS ADDED

      const saveUser = await user.save();
      res.status(200).json(saveUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});

//LOGIN USER

const userLogin = async (req, res) => {
  try {
    //VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      //CHECKING IF USER EMAIL EXISTS
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(400).send("Incorrect Email- ID");

      //CHECKING IF USER PASSWORD MATCHES

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) return res.status(400).send("Incorrect Password");
      //SENDING BACK THE TOKEN
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "3d",
      });
      res.header("auth-token", token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
