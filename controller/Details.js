const Contract = require("../models/contract");
const Inventory = require("../models/inventory");

module.exports.getdashborad = async (req, res, next) => {
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
};

module.exports.postcontract = (req, res, next) => {
  const currentDate = new Date().toISOString().split("T")[0];
  let newContract = new Contract({
    Contract_ID: req.body.Contract_ID,
    Contract_Name: req.body.Contract_Name,
    Contract_Status: req.body.Contract_Status,
    Contract_Type: req.body.Contract_Type,
    Contract_StartDate: req.body.Contract_StartDate,
    Contract_EndData: req.body.Contract_EndData,
    Description: req.body.Description,
    Price_Order_Number: req.body.Price_Order,
    Billing_Cycle: req.body.Billing_Cycle,
    LastInvoice_Date: req.body.LastInvoice_Data,
    Contract_Price: req.body.Contract_Price,
    file: req.file.path.substr(7),
    Modified_Date: currentDate,
    Project_Man_Email: req.body.Project_Man_Email,
    Project_Man_Name: req.body.Project_Man_Name,
    User_id: req.user._id,
  });
  newContract.save().then((r) => {
    res.redirect("/dashboard");
  });
};

module.exports.getaddcontract = (req, res) => {
  res.render("addcontract");
};

module.exports.getdetails = (req, res) => {
  Contract.findById({ _id: req.body.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.getaboutus = (req, res) => {
  res.render("aboutus");
};

module.exports.getcontractdetailsbyid = (req, res) => {
  Contract.find({ _id: req.query.id })
    .populate("Inventory")
    .then((contract) => {
      res.render("details", {
        name: req.user.name,
        contract: contract,
      });
    });
};

module.exports.postinventory = (req, res) => {
  Contract.findById({ _id: req.body.Contract_id }).then((result) => {
    const newinventory = new Inventory({
      Invent_type: req.body.Invent_Type,
      Invent_model: req.body.Invent_Model,
      Invent_sno: req.body.Invent_Serial_Number,
      Invent_End_Date: result.Contract_EndData,
      Invent_Start_Date: result.Contract_StartDate,
      Invent_life_cycle: req.body.Invent_EndliffeDate,
      Purchase_date: result.Contract_StartDate,
      Invent_Invoice: req.file.path.substr(7),
    });
    newinventory
      .save()
      .then((re) => {
        Contract.findByIdAndUpdate(
          { _id: req.body.Contract_id },
          {
            $push: { Inventory: re._id },
          }
        ).then((r) => {
          res.send(r);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
