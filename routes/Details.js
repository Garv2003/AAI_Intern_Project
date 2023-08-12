const express = require("express");
const router = express.Router();
const Contract = require("../models/contract");

router.get("/dashboard", async (req, res) => {
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
  const currentDate = new Date().toISOString().split("T")[0];
  let newContract = new Contract({
    Contract_ID: req.body.Contract_ID,
    Contract_Name: req.body.Contract_Name,
    Contract_Status: req.body.Contract_Status,
    Contract_Type: req.body.Contract_Type,
    Contract_StartDate: req.body.Contract_StartDate,
    Contract_EndData: req.body.Contract_EndData,
    Description: req.body.Description,
    Price_Order_Number:req.body.Price_Order,
    Billing_Cycle:req.body.Billing_Cycle,
    LastInvoice_Date:req.body.LastInvoice_Data,
    Contract_Price:req.body.Contract_Price,
    Modified_Date:currentDate,
    User_id: req.user._id,
  });
  newContract.save().then((r) => {
    res.redirect("/dashboard");
  });
});

router.post("/getdetails",(req,res)=>{
  Contract.findById({_id:req.body.id})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    res.send(err);
  })
})

router.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

router.get("/details", (req, res) => {
  res.render("details");
});

module.exports = router;
