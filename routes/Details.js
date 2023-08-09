const express = require("express");
const router = express.Router();
const Contract = require("../models/contract");

router.get("/dashboard", async (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(currentDate);
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
              capital: capital,
            });
          });
      });
  });
});

router.get("/addcontract", (req, res) => {
    res.render("addcontract");
  });
  

router.post("/addcontract", (req, res) => {
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
    res.redirect("/dashboard");
  });
});

router.get("/aboutus",(req,res)=>{
  res.render("aboutus");
})

router.get("/details",(req,res)=>{
  res.render("details")
})

module.exports = router;
