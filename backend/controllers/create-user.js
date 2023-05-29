const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    console.log(req.body);
    const userExit = await userModel.findOne({ email: req.body.email })
    if (!userExit) {
      if (req.body.password) {
        const passwordSalting = await bcrypt.genSalt(14);
        var hashpassword = await bcrypt.hash(req.body.password, passwordSalting);
      }
      const userDetails = {
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        contact: req.body.contact,
      }
      let user = new userModel(userDetails);
      const userData = await user.save();
      if (userData) {
        res.status(200).send('User create success');
        return res.status(200).json({ message: " Regirster successfully" });
      }

    } else {
      res.send("User have regirsted please user another mailID")
    }
  } catch (error) {
    console.log(error)
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email", email, "password", password)
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const comperPassword = await bcrypt.compare(password, user.password);
    if ((user.email === email) && comperPassword) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '30h' });
      return res.status(200).json({ message: "Login successfully", token: token });
    }
    else {
      return res.status(401).json({ error: 'Invalid password' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const data = await userModel.find();
    return res.status(500).json({ data });
  } catch (error) {
    console.log(error);
  }
}