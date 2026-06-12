const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {

    const userId = req.user._id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "category, amount and date are required"
            })
        }

        const expense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        res.status(201).json({
            message: "Expense added successfully",
            expense
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Error adding expense",
            error: err.message
        });
    }
}

exports.getAllExpenses = async (req, res) => {

    const userId = req.user._id;
    try{
        const expenses = await Expense.find({userId}).sort({date:-1});
        res.status(200).json({
            message:"Expenses retrieved successfully",
            expenses
        })

    }catch(err){
        res.status(500).json({
            message:"Error retrieving expenses",
            error:err.message
        })

    }

}

exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;
    const expenseId = req.params.id;

    try{
        const expense = await Expense.findOneAndDelete({_id:expenseId,userId});
        if(!expense){
            return res.status(404).json({
                message:"Expense not found"
            })
        }

        res.status(200).json({
            message:"Expense deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message:"Error deleting expense",
            error:err.message
        })
    }

}

exports.downloadExpenseReport = async (req, res) => {
    const userId = req.user._id;
    try{
        const expenses = await Expense.find({userId}).sort({date:-1});
        const data = expenses.map((item)=>
        ({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expenses");
        xlsx.writeFile(wb,"ExpenseReport.xlsx");
        res.download("ExpenseReport.xlsx");
    }
    catch(err){
        res.status(500).json({
            message:"Error downloading expense report",
            error:err.message
        })
    }
}