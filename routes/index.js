var express = require("express");
var router = express.Router();
// var expenses= require('../database/expense')
const Expenses = require("../models/expenses");


/* GET home page. */
router.get("/", function (req, res, next) {
  Expenses.find().then((expenses) => {
    res.render("index", { title: "Expense tracker", expenseList: expenses });
  });
});

router.get("/add", function (req, res, next) {
  res.render("addExpense");
});
router.post("/saveExpense",  async function (req, res) {
  let expense =new Expenses( {
    "title": req.body.title,
    "paidBy": req.body.paidBy,
    "description": req.body.description,
   " amount": parseInt(req.body.amount)
  });
   await Expenses.insertMany(expense);
  // expenses.push({ ...formData, _id: expenses.length + 1 });
  res.redirect("/");
});

router.post("/saveEdit/:id",  async function (req, res) {
  let formData= {
    "title": req.body.title,
    "paidBy": req.body.paidBy,
    "description": req.body.description,
    "amount": parseInt(req.body.amount),
  };
await Expenses.findOneAndUpdate({_id:req.params.id},{$set:{...formData}})
  res.redirect("/");
});


router.get("/delete/:index", async function (req, res, next) {
   await Expenses.deleteOne({_id:req.params.index});
  res.redirect("/");
});

router.get("/edit/:id", async function (req, res) {
  const expense =  await Expenses.findOne({_id:req.params.id});
  res.render("editExpense", { expense: expense });
});
module.exports = router;
