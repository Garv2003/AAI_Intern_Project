const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3456;

const session = require("express-session");
const passport = require("./auth/passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(path.extname(file.originalname));
    let extName = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extName);
  },
});
function fileFilter(req, file, cb) {
  let extName = path.extname(file.originalname);
  if (
    extName === ".jpg" ||
    extName === ".jpeg" ||
    extName === ".png" ||
    extName === ".pdf"
  )
    return cb(null, true);
  cb(null, false);
}
const upload = multer({ storage: storage, fileFilter: fileFilter });
app.use(upload.single("myfile"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
//
const Contract = require("./models/contract");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "leonora.bayer90@ethereal.email",
    pass: "67tMY5ty8xCyn6AP2D",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(a) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <indiaairpot@gmail.com>', // sender address
    to:a, // list of receivers
    subject: "Remainder for contract", // Subject line
    text: "`Your contract is expiring", // plain text body
    html: "<b>Your contract is expiring</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
}

cron.schedule("5 * * * *", async () => {
  // cron.schedule('0 3 * * *', async () => {
  const currentDate = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);
  try {
    const expiringContracts = await Contract.find({
      Contract_EndData: { $lt: sixMonthsFromNow },
    });
    expiringContracts.forEach((contract) => {
      main(contract.Project_Man_Email).catch(console.error);
    });
  } catch (error) {
    console.error("Error fetching contracts:", error);
  }
});

const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/", require("./routes/login"));
app.use("/signup", require("./routes/signup"));
app.use("/", require("./routes/Details"));

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log("Connection err: ", err);
  });

