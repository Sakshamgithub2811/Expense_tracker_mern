const xlsx = require("xlsx");
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {

    const userId = req.user._id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({
                message: "source, amount and date are required"
            })
        }

        const income = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        res.status(201).json({
            message: "Income added successfully",
            income
        })

    }
    catch (err) {
        res.status(500).json({
            message: "Error adding income",
            error: err.message
        });
    }
}

exports.getAllIncome = async (req, res) => {

    const userId = req.user._id;
    try{
        const incomes = await Income.find({userId}).sort({date:-1});
        res.status(200).json({
            message:"Incomes retrieved successfully",
            incomes
        })

    }catch(err){
        res.status(500).json({
            message:"Error retrieving incomes",
            error:err.message
        })

    }

}

exports.deleteIncome = async (req, res) => {
    const userId = req.user._id;
    const incomeId = req.params.id;

    try{
        const income = await Income.findOneAndDelete({_id:incomeId,userId});
        if(!income){
            return res.status(404).json({
                message:"Income not found"
            })
        }

        res.status(200).json({
            message:"Income deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            message:"Error deleting income",
            error:err.message
        })
    }

}

exports.downloadIncomeReport = async (req, res) => {
    const userId = req.user._id;
    try{
        const incomes = await Income.find({userId}).sort({date:-1});
        const data = incomes.map((item)=>
        ({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Incomes");
        xlsx.writeFile(wb,"IncomeReport.xlsx");
        res.download("IncomeReport.xlsx");
    }
    catch(err){
        res.status(500).json({
            message:"Error downloading income report",
            error:err.message
        })
    }
}