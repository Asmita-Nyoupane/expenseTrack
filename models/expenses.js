const  mongoose=require('mongoose');
const ExpenseSchema=mongoose.Schema({
    title:String,
    description:String,
    amount:Number,
    paidBy:String,
    createDate:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Expenses',ExpenseSchema);