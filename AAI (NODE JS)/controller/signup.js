const User = require("../models/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.getlogin = (req, res) => {
  res.render("login");
};

module.exports.postlogin = async (req, res) => {
  const { email, password } = req.body;
  let username = email;
  try {
    let user = await User.findOne({ username });
    if (user) {
      res.send({
        msg: "User is Already Present",
      });
    } else {
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          await User.create({
            username,
            password: hash,
            name: req.body.name,
          });
          res.send({
            msg: "Signup Success",
          });
        });
      });
    }
  } catch (err) {
    res.send(err);
  }
};
