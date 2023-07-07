var express = require('express');
var router = express.Router();
var expenses= require('../database/expense')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expense Tracker',expenseList:expenses});
});
router.get('/add', function(req, res, next) {
  res.render('addExpense' );
});
router.post('/saveExpense', function(req, res, next) {
let formData={
  "title":req.body.title,
 " paidBy":req.body.paidBy,
 "description":req.body.description,
 "amount":req.body.amount
}

expenses.push({...formData,_id:expenses.length+1})
res.redirect('/')
});

router.post('/saveEdit/:id', function(req, res, next) {
  let formData={
  "title":req.body.title,
 "paidBy":req.body.paidBy,
 "description":req.body.description,
 "amount":req.body.amount
}
  const index=expenses.findIndex(expenses=>{
    return expenses._id == req.params.id
  });
  expenses.splice(index,1,{_id:req.params.id,...formData})
  res.redirect('/')
  });


router.get('/delete/:index',function(req,res,next){
expenses.splice(req.params.index,1)
res.redirect('/')
});

router.get('/edit/:id', function(req, res) {
  const expense=expenses.find(expense=>expense._id == req.params.id)
  res.render('editExpense',{expense:expense})
});
module.exports = router;
