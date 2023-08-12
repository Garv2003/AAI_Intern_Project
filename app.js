const path = require("path");
const express = require("express");
const app = express();
const PORT = 4444;
const session = require("express-session");
const passport = require("./auth/passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const morgan=require("morgan");

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
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

app.use(morgan("dev"))
app.use("/", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/",require("./routes/Details"));

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
