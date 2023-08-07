const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;
const session = require("express-session");
const passport = require("./auth/passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const Contract = require("./models/contract");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "asdjbaskdadbaskdv",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/testdb",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/login"));
app.use("/signup", require("./routes/signup"));

app.get("/details", async (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  console.log(currentDate)
  Contract.find({}).then((contract) => {
    Contract.find()
      .where({ Contract_Type: "Revenue Expenditure" })
      .then((revenue) => {
        Contract.find()
          .where({ Contract_Type: "Capital expenditure" })
          .then((capital) => {
            res.render("home", {
              username: req.user.username,
              name: req.user.name,
              contract: contract,
              revenue: revenue,
              capital:capital
            });
          });
      });
  });
});

app.get("/addcontract", (req, res) => {
  res.render("addcontract");
});

app.post("/addcontract", (req, res) => {
  console.log(req.body);
  let newContract = new Contract({
    Contract_ID: req.body.Contract_ID,
    Contract_Name: req.body.Contract_Name,
    Contract_Status: req.body.Contract_Status,
    Contract_Type: req.body.Contract_Type,
    Contract_StartDate: req.body.Contract_StartDate,
    Contract_EndData: req.body.Contract_EndData,
    Description: req.body.Description,
    User_id: req.user._id,
  });
  newContract.save().then((r) => {
    res.redirect("/details");
  });
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

mongoose
  .connect("mongodb://127.0.0.1/testdb")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log("Connection err: ", err);
  });
